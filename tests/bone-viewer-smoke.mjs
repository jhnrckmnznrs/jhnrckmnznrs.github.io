import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import isosurface from 'isosurface';
import {
  openSingleTiff,
  openSliceSeries,
  planVolume
} from '../src/lib/boneViewer/volumeSources.js';

async function namedBlob(relativePath, name = relativePath.split('/').at(-1)) {
  const bytes = await readFile(new URL(`./fixtures/${relativePath}`, import.meta.url));
  const blob = new Blob([bytes], { type: 'image/tiff' });
  Object.defineProperty(blob, 'name', { value: name });
  Object.defineProperty(blob, 'webkitRelativePath', { value: `series/${name}` });
  return blob;
}

const volumeBlob = await namedBlob('tiny-volume.tif', 'tiny-volume.tif');
const source = await openSingleTiff(volumeBlob);

assert.deepEqual(source.metadata.shapeZYX, [3, 4, 4]);
assert.equal(source.metadata.fileCount, 1);
assert.equal(source.metadata.bytesPerVoxel, 1);

const middle = await source.readSlice(1, 4, 4);
assert.equal(middle.length, 16);
assert.ok(Array.from(middle).some((value) => value > 0));

const plan = planVolume(source.metadata);
assert.equal(plan.strategy, 'direct');
assert.ok(plan.levels.length >= 1);
assert.deepEqual(plan.levels.at(-1).shapeZYX, [3, 4, 4]);

const seriesFiles = await Promise.all([
  namedBlob('slice10.tif'),
  namedBlob('slice2.tif'),
  namedBlob('slice1.tif')
]);

const series = await openSliceSeries(seriesFiles);
assert.deepEqual(series.metadata.shapeZYX, [3, 4, 4]);
assert.deepEqual(series.metadata.ordering, {
  first: 'slice1.tif',
  middle: 'slice2.tif',
  last: 'slice10.tif'
});

const seriesMiddle = await series.readSlice(1, 4, 4);
assert.ok(Array.from(seriesMiddle).includes(2));

const field = new Uint8Array(4 * 4 * 4);
for (let z = 1; z < 3; z += 1) {
  for (let y = 1; y < 3; y += 1) {
    for (let x = 1; x < 3; x += 1) {
      field[(z * 4 + y) * 4 + x] = 1;
    }
  }
}

const surface = isosurface.marchingCubes(
  [4, 4, 4],
  (x, y, z) => {
    const xi = Math.max(0, Math.min(3, Math.round(x)));
    const yi = Math.max(0, Math.min(3, Math.round(y)));
    const zi = Math.max(0, Math.min(3, Math.round(z)));
    return field[(zi * 4 + yi) * 4 + xi] ? -1 : 1;
  },
  [[0, 0, 0], [3, 3, 3]]
);

assert.ok(surface.positions.length > 0);
assert.ok(surface.cells.length > 0);

console.log('Bone viewer smoke test passed.');
console.log({
  multipageShapeZYX: source.metadata.shapeZYX,
  seriesShapeZYX: series.metadata.shapeZYX,
  seriesOrdering: series.metadata.ordering,
  strategy: plan.strategy,
  levels: plan.levels.map((level) => level.shapeZYX),
  surfaceVertices: surface.positions.length,
  surfaceCells: surface.cells.length
});
