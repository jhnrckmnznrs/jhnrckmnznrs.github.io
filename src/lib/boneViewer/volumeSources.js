import { fromBlob } from 'geotiff';

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

const TIFF_RE = /\.tiff?$/i;
const PNG_RE = /\.png$/i;

const firstValue = (value) => Array.isArray(value) || ArrayBuffer.isView(value) ? value[0] : value;

function getTiffTag(image, name) {
  try {
    return image.fileDirectory?.getValue?.(name);
  } catch {
    return undefined;
  }
}

function unitToMicrometres(unit) {
  if (!unit) return 1;
  const value = String(unit).trim().toLowerCase();
  if (['µm', 'μm', 'um', 'micrometer', 'micrometre'].includes(value)) return 1;
  if (['nm', 'nanometer', 'nanometre'].includes(value)) return 0.001;
  if (['mm', 'millimeter', 'millimetre'].includes(value)) return 1000;
  if (['cm', 'centimeter', 'centimetre'].includes(value)) return 10000;
  if (['m', 'meter', 'metre'].includes(value)) return 1_000_000;
  return 1;
}

function parseOmeMetadata(description) {
  if (!description || typeof DOMParser === 'undefined') return null;

  const text = Array.isArray(description) ? description[0] : String(description);
  if (!text.includes('<OME')) return null;

  try {
    const document = new DOMParser().parseFromString(text, 'application/xml');
    const pixels = document.querySelector('Pixels');
    if (!pixels) return null;

    const x = Number(pixels.getAttribute('PhysicalSizeX'));
    const y = Number(pixels.getAttribute('PhysicalSizeY'));
    const z = Number(pixels.getAttribute('PhysicalSizeZ'));

    const spacing = [z, y, x];
    const units = [
      pixels.getAttribute('PhysicalSizeZUnit'),
      pixels.getAttribute('PhysicalSizeYUnit'),
      pixels.getAttribute('PhysicalSizeXUnit')
    ];

    const spacingMicrometresZYX = spacing.every(Number.isFinite)
      ? spacing.map((value, index) => value * unitToMicrometres(units[index]))
      : null;

    return {
      sizeZ: Number(pixels.getAttribute('SizeZ')),
      sizeC: Number(pixels.getAttribute('SizeC')),
      sizeT: Number(pixels.getAttribute('SizeT')),
      spacingMicrometresZYX
    };
  } catch {
    return null;
  }
}

function naturalSort(files) {
  return [...files].sort((a, b) => collator.compare(a.name, b.name));
}

function shapeForMaxDimension(shapeZYX, maxDimension) {
  const scale = Math.max(...shapeZYX) / maxDimension;
  if (scale <= 1) return [...shapeZYX];
  return shapeZYX.map((value) => Math.max(2, Math.round(value / scale)));
}

function sameShape(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function uniqueLevel(levels, candidate) {
  if (levels.some((level) => sameShape(level.shapeZYX, candidate.shapeZYX))) return;
  levels.push(candidate);
}

export function planVolume(metadata) {
  const [nz, ny, nx] = metadata.shapeZYX;
  const voxels = nx * ny * nz;
  const bytesPerVoxel = Math.max(1, metadata.bytesPerVoxel || 1);
  const rawBytes = voxels * bytesPerVoxel;
  const workspaceBytes = rawBytes * 2.5;

  let strategy = 'direct';
  let strategyLabel = 'Direct processing';
  let explanation = 'The full source is small enough that native detail can be offered in the browser.';

  if (rawBytes > 256 * 1024 ** 2) {
    strategy = 'streaming';
    strategyLabel = 'Streaming preview';
    explanation = 'The viewer will read selected slices or pages into coarse volumes rather than materialising the full source.';
  }

  if (rawBytes > 4 * 1024 ** 3) {
    strategy = 'spatial';
    strategyLabel = 'Spatial refinement required';
    explanation = 'A coarse preview can be built locally, but native detail should use prepared spatial chunks rather than one complete browser mesh.';
  }

  const levels = [];
  const targets = strategy === 'direct'
    ? [
        ['overview', 'Overview', 96],
        ['preview', 'Preview', 160],
        ['medium', 'Medium', 240]
      ]
    : strategy === 'streaming'
      ? [
          ['overview', 'Overview', 96],
          ['preview', 'Preview', 144],
          ['medium', 'Medium', 192]
        ]
      : [
          ['overview', 'Overview', 80],
          ['preview', 'Preview', 112]
        ];

  for (const [id, label, maxDimension] of targets) {
    uniqueLevel(levels, {
      id,
      label,
      shapeZYX: shapeForMaxDimension(metadata.shapeZYX, maxDimension),
      generated: true,
      approximation: 'resampled navigation surface'
    });
  }

  if (strategy === 'direct' && voxels <= 50_000_000) {
    uniqueLevel(levels, {
      id: 'detail',
      label: 'Native detail',
      shapeZYX: [...metadata.shapeZYX],
      generated: true,
      approximation: 'native source resolution'
    });
  }

  return {
    strategy,
    strategyLabel,
    explanation,
    voxels,
    rawBytes,
    workspaceBytes,
    levels
  };
}

async function inspectTiffFile(file) {
  const tiff = await fromBlob(file);
  const imageCount = await tiff.getImageCount();
  const first = await tiff.getImage(0);

  const width = first.getWidth();
  const height = first.getHeight();
  const samplesPerPixel = first.getSamplesPerPixel();
  const bits = Number(firstValue(getTiffTag(first, 'BitsPerSample'))) || 8;
  const sampleFormat = Number(firstValue(getTiffTag(first, 'SampleFormat'))) || 1;
  const description = firstValue(getTiffTag(first, 'ImageDescription'));
  const ome = parseOmeMetadata(description);

  return {
    tiff,
    imageCount,
    width,
    height,
    samplesPerPixel,
    bitsPerSample: bits,
    sampleFormat,
    bytesPerVoxel: Math.max(1, Math.ceil(bits / 8)),
    ome,
    bigTiff: Boolean(tiff.bigTiff)
  };
}

function pngScalarFromRgba(rgba, pixelIndex) {
  const offset = pixelIndex * 4;
  return Math.max(rgba[offset], rgba[offset + 1], rgba[offset + 2]);
}

async function pngDimensions(file) {
  const bitmap = await createImageBitmap(file);
  const result = [bitmap.height, bitmap.width];
  bitmap.close();
  return result;
}

async function pngSlice(file, width, height) {
  const bitmap = await createImageBitmap(file, {
    resizeWidth: width,
    resizeHeight: height,
    resizeQuality: 'pixelated'
  });

  const canvas = typeof OffscreenCanvas !== 'undefined'
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), { width, height });

  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.imageSmoothingEnabled = false;
  context.drawImage(bitmap, 0, 0, width, height);
  const rgba = context.getImageData(0, 0, width, height).data;
  bitmap.close();

  const output = new Uint8Array(width * height);
  for (let index = 0; index < output.length; index += 1) {
    output[index] = pngScalarFromRgba(rgba, index);
  }
  return output;
}

export async function openSingleTiff(file) {
  const info = await inspectTiffFile(file);

  const ome = info.ome;
  const depth = ome?.sizeZ > 0 && ome.sizeC === 1 && ome.sizeT === 1
    ? ome.sizeZ
    : info.imageCount;

  if (ome && (ome.sizeC > 1 || ome.sizeT > 1) && info.imageCount !== ome.sizeZ) {
    throw new Error(
      'This OME TIFF contains multiple channels or time points. The current importer only accepts one channel and one time point so that slice ordering is unambiguous.'
    );
  }

  if (depth < 2) {
    throw new Error('The selected TIFF contains only one image. A 3D volume needs multiple TIFF pages or a folder of image slices.');
  }

  const metadata = {
    kind: info.bigTiff ? 'BigTIFF volume' : (ome ? 'OME TIFF volume' : 'Multipage TIFF volume'),
    name: file.name,
    sourceBytes: file.size,
    fileCount: 1,
    shapeZYX: [depth, info.height, info.width],
    bytesPerVoxel: info.bytesPerVoxel,
    samplesPerPixel: info.samplesPerPixel,
    spacingMicrometresZYX: ome?.spacingMicrometresZYX || null,
    spacingSource: ome?.spacingMicrometresZYX ? 'OME metadata' : null,
    ordering: null,
    warning: info.samplesPerPixel > 1
      ? 'Only the first sample of each TIFF page will be used.'
      : null
  };

  return {
    metadata,
    async readSlice(index, width, height) {
      const image = await info.tiff.getImage(index);
      if (image.getWidth() !== info.width || image.getHeight() !== info.height) {
        throw new Error(`TIFF page ${index + 1} has dimensions that differ from the first page.`);
      }

      const raster = await image.readRasters({
        samples: [0],
        interleave: true,
        width,
        height,
        resampleMethod: 'nearest'
      });

      return raster;
    }
  };
}

export async function openSliceSeries(files) {
  const accepted = naturalSort(
    files.filter((file) => TIFF_RE.test(file.name) || PNG_RE.test(file.name))
  );

  if (accepted.length < 2) {
    throw new Error('Select a folder containing at least two TIFF or PNG slices.');
  }

  const tiffs = accepted.filter((file) => TIFF_RE.test(file.name));
  const pngs = accepted.filter((file) => PNG_RE.test(file.name));

  if (tiffs.length && pngs.length) {
    throw new Error('The selected folder mixes TIFF and PNG slices. Use one image format per volume so the ordering and intensity interpretation are unambiguous.');
  }

  const format = tiffs.length ? 'TIFF slice series' : 'PNG slice series';
  let height;
  let width;
  let bytesPerVoxel = 1;
  let samplesPerPixel = 1;

  if (tiffs.length) {
    const first = await inspectTiffFile(accepted[0]);
    if (first.imageCount !== 1) {
      throw new Error('A TIFF slice folder should contain one image per file. One of the selected files is itself a multipage TIFF.');
    }
    height = first.height;
    width = first.width;
    bytesPerVoxel = first.bytesPerVoxel;
    samplesPerPixel = first.samplesPerPixel;

    const middle = await inspectTiffFile(accepted[Math.floor(accepted.length / 2)]);
    const last = await inspectTiffFile(accepted[accepted.length - 1]);
    if (middle.width !== width || middle.height !== height || last.width !== width || last.height !== height) {
      throw new Error('The first, middle, and last TIFF slices do not have matching dimensions.');
    }
  } else {
    [height, width] = await pngDimensions(accepted[0]);
    const [middleHeight, middleWidth] = await pngDimensions(accepted[Math.floor(accepted.length / 2)]);
    const [lastHeight, lastWidth] = await pngDimensions(accepted[accepted.length - 1]);
    if (middleWidth !== width || middleHeight !== height || lastWidth !== width || lastHeight !== height) {
      throw new Error('The first, middle, and last PNG slices do not have matching dimensions.');
    }
  }

  const firstPath = accepted[0].webkitRelativePath || accepted[0].name;
  const folderName = firstPath.includes('/') ? firstPath.split('/')[0] : 'Local slice series';

  const metadata = {
    kind: format,
    name: folderName,
    sourceBytes: accepted.reduce((total, file) => total + file.size, 0),
    fileCount: accepted.length,
    shapeZYX: [accepted.length, height, width],
    bytesPerVoxel,
    samplesPerPixel,
    spacingMicrometresZYX: null,
    spacingSource: null,
    ordering: {
      first: accepted[0].name,
      middle: accepted[Math.floor(accepted.length / 2)].name,
      last: accepted[accepted.length - 1].name
    },
    warning: samplesPerPixel > 1
      ? 'Only the first sample of each TIFF slice will be used.'
      : null
  };

  return {
    metadata,
    async readSlice(index, targetWidth, targetHeight) {
      const file = accepted[index];

      if (tiffs.length) {
        const info = await inspectTiffFile(file);
        if (info.width !== width || info.height !== height) {
          throw new Error(`${file.name} does not match the expected slice dimensions.`);
        }

        const image = await info.tiff.getImage(0);
        return image.readRasters({
          samples: [0],
          interleave: true,
          width: targetWidth,
          height: targetHeight,
          resampleMethod: 'nearest'
        });
      }

      return pngSlice(file, targetWidth, targetHeight);
    }
  };
}

export async function buildBinaryVolume(source, targetShapeZYX, threshold, onProgress) {
  const [sourceZ] = source.metadata.shapeZYX;
  const [targetZ, targetY, targetX] = targetShapeZYX;
  const volume = new Uint8Array(targetZ * targetY * targetX);

  const selectedIndices = Array.from({ length: targetZ }, (_, index) => {
    if (targetZ === 1) return Math.floor((sourceZ - 1) / 2);
    return Math.round(index * (sourceZ - 1) / (targetZ - 1));
  });

  for (let outputZ = 0; outputZ < targetZ; outputZ += 1) {
    const sourceIndex = selectedIndices[outputZ];
    const slice = await source.readSlice(sourceIndex, targetX, targetY);

    if (slice.length < targetX * targetY) {
      throw new Error('A decoded slice is smaller than the requested target dimensions.');
    }

    const offset = outputZ * targetY * targetX;
    for (let index = 0; index < targetX * targetY; index += 1) {
      volume[offset + index] = Number(slice[index]) > threshold ? 1 : 0;
    }

    onProgress?.((outputZ + 1) / targetZ, sourceIndex);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return volume;
}

export function sourceFileExtensions(files) {
  return {
    tiff: files.filter((file) => TIFF_RE.test(file.name)).length,
    png: files.filter((file) => PNG_RE.test(file.name)).length
  };
}
