# Browser bone viewer data format

The browser viewer reads a local folder. Nothing in local mode is uploaded to the website.

## Folder structure

```text
QC001/
├── manifest.json
└── meshes/
    ├── overview.glb.gz
    ├── preview.glb.gz
    ├── medium.glb.gz
    └── detail.glb.gz
```

The names of the mesh files are not hard coded. The manifest tells the viewer which file belongs to each level.

## Preparing a volume

Install the Python dependencies:

```bash
python -m pip install numpy tifffile scikit-image trimesh
```

Then run:

```bash
python scripts/prepare_bone_viewer.py QC001_bone.ome.tif QC001_viewer --id QC001
```

OME TIFF voxel spacing is read from the OME metadata. For an ordinary TIFF, provide the spacing explicitly:

```bash
python scripts/prepare_bone_viewer.py bone.tif bone_viewer \
  --spacing-um 25.1 25.1 25.1
```

## Levels

The default pooling factors are 8, 4, 2, and 1.

- **Overview** uses factor 8.
- **Preview** uses factor 4.
- **Medium** uses factor 2.
- **Native detail** uses factor 1.

For factors greater than one, the converter uses max pooling before marching cubes surface extraction. This helps thin foreground structures remain visible in a coarse navigation model, but it does not preserve topology in general.

The native detail level is extracted directly from the input segmentation.

## Why gzip GLB?

GLB keeps each surface in one binary file. Gzip substantially reduces these meshes because vertex and index data contain repeated structure. The viewer uses the browser Compression Streams API to decompress the file and passes the resulting ArrayBuffer directly to Three.js GLTFLoader.

## Manifest

A version 1 manifest has the form:

```json
{
  "format": "banyuhay-bone-viewer",
  "version": 1,
  "id": "QC001",
  "units": "mm",
  "source": {
    "shapeZYX": [338, 222, 222],
    "spacingMicrometresZYX": [25.1, 25.1, 25.1]
  },
  "levels": [
    {
      "id": "overview",
      "label": "Overview",
      "file": "meshes/overview.glb.gz",
      "compressedBytes": 187849,
      "vertices": 17145,
      "triangles": 33564,
      "approximation": "max pooled by factor 8 before surface extraction"
    }
  ]
}
```

Additional fields are allowed. The viewer ignores fields it does not understand.

## Privacy

A specimen folder selected through the local file control is read by JavaScript running in the browser. The current viewer does not send the selected files to a server.

This makes local mode suitable for developing the inspection workflow before any decision is made about public or remote hosting.

## Future remote format

The same manifest can later be hosted on object storage. At that point each `file` entry can be fetched by URL instead of being resolved from a local folder.

For very large native surfaces, the next format revision should replace whole specimen levels with spatial tiles or an octree so that only visible regions need high detail geometry.
