# Flexible volume import architecture

The trabecular bone viewer treats a volume as an abstract source rather than as a particular file format.

## Supported local inputs

The current browser importer accepts:

- one multipage TIFF;
- one OME TIFF with one channel and one time point;
- one BigTIFF where the underlying TIFF reader can decode it;
- a directory of single page TIFF slices;
- a directory of PNG slices;
- a prepared Banyuhay multiresolution surface dataset.

Files selected in local mode are read by JavaScript in the browser. They are not uploaded by the viewer.

## Internal source abstraction

A source provides metadata and one operation:

```text
metadata
readSlice(z, targetWidth, targetHeight)
```

The renderer therefore does not need to know whether a slice came from a page inside one TIFF, one TIFF file in a directory, or one PNG file.

The current source adapters live in:

```text
src/lib/boneViewer/volumeSources.js
```

## Inspection before processing

The importer first determines:

- source type;
- width, height, and depth;
- number of files;
- bits per voxel when available;
- OME physical spacing when available;
- estimated raw volume size;
- a conservative direct workspace estimate.

The source is then classified into one of three processing regimes.

### Direct processing

Used when the raw volume estimate is at most 256 MiB.

The viewer may offer a native detail level if the source contains at most 50 million voxels.

### Streaming preview

Used above 256 MiB and up to 4 GiB raw.

The viewer does not assemble the full source volume. It requests only enough source slices and resamples them into a smaller working volume for each preview level.

### Spatial refinement required

Used above 4 GiB raw.

The viewer can still build a coarse preview from lazily read source slices, but it does not offer a native whole volume surface. Native inspection at this scale should use spatial chunks or an octree.

The numerical boundaries are initial engineering defaults. They should be revised from browser measurements rather than treated as universal limits.

## TIFF behaviour

The browser uses `geotiff` for TIFF access.

For a local multipage TIFF, the file is opened as a Blob source and image directories are accessed lazily. Pixel raster data are not decoded merely to inspect metadata.

For generated preview levels, selected pages are requested individually and resampled to the target X and Y dimensions.

OME physical sizes are read from the first image description when the OME metadata describe one channel and one time point.

Volumes with multiple channels or time points are currently rejected when page ordering would be ambiguous.

## Slice directories

File names are sorted with numeric aware ordering.

For example:

```text
slice1.tif
slice2.tif
slice10.tif
```

is interpreted in that order rather than lexical order.

The interface exposes the first, middle, and last selected names so the user can check ordering before generating a surface.

A TIFF directory must contain single page TIFF files.

A directory that mixes TIFF and PNG files is rejected.

## PNG slices

PNG slices are decoded with the browser image decoder and resampled through an offscreen canvas when available.

The current scalar value is the maximum of the red, green, and blue channels. This is appropriate for binary black and white segmentations and many grayscale PNG exports.

More general colour interpretation is outside the current viewer scope.

## Threshold

The direct importer treats a voxel as foreground when:

```text
value > threshold
```

The default threshold is zero, which is convenient for binary masks stored as 0 and 1, 0 and 255, or 0 and a positive integer.

For grayscale micro CT, the threshold must currently be chosen manually.

Histogram based thresholding and an orthogonal slice preview should be added before calling grayscale import complete.

## Preview construction

A requested preview level has a target Z, Y, X shape.

The importer selects source Z positions across the full depth, decodes each selected slice only when it is needed, and resamples X and Y to the target shape.

This is deliberately a fast navigation approximation.

It is not equivalent to the max pooled preparation script and can miss thin structures between sampled Z positions.

## Surface generation

The resampled binary working volume is transferred to a Web Worker.

The worker uses marching cubes through the `isosurface` package and sends only vertex and index buffers back to the main page.

This keeps polygonisation away from the main interaction thread.

The physical extent is retained by increasing the effective voxel spacing as the working grid becomes coarser.

## Prepared datasets remain useful

Prepared datasets are not being replaced.

They remain preferable when:

- the same specimen will be opened repeatedly;
- the native mesh is expensive to compute;
- a validated preprocessing route is required;
- the source is too large for whole volume browser processing;
- remote public hosting is later enabled.

The direct importer and the prepared format are two front ends to the same viewer.

## Important current limitations

1. The source importer is primarily designed for binary segmentations.
2. Grayscale thresholding has no histogram or slice preview yet.
3. Browser generated coarse levels use slice sampling and image resampling, so topology is not preserved.
4. OME TIFF with multiple channels or time points is not yet mapped into selectable dimensions.
5. A very large monolithic TIFF can be previewed only to the extent supported by lazy TIFF page access and the browser's decoder.
6. Native detail for very large volumes requires the future spatial chunk format.
7. Browser cache storage has not yet been added.

## Next implementation stages

### Orthogonal source preview

Show first, middle, and last slices and add axial, coronal, and sagittal inspection before surface generation.

### Threshold tools

Add a histogram, Otsu suggestion, manual threshold preview, and binary foreground fraction estimate.

### Persistent local cache

Store generated previews and surfaces in the Origin Private File System or IndexedDB, keyed by a robust source fingerprint.

### Spatial surface format

Partition native geometry into spatial nodes and refine only visible nodes.

This is the required step for truly large volumes such as tens of billions of voxels.

### OME Zarr

Add an OME Zarr source adapter using the same `metadata + readBlock` abstraction.
