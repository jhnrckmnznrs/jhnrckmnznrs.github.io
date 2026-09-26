#!/usr/bin/env python3
"""Prepare a binary trabecular bone volume for the Banyuhay browser viewer.

The script creates several surface levels, compresses each GLB with gzip,
and writes a manifest.json file understood by the browser viewer.

Coarse levels use max pooling before surface extraction. They are intended
for navigation only and are not guaranteed to preserve topology.
"""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import shutil
import time
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np
import tifffile
import trimesh
from skimage.measure import block_reduce, marching_cubes


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path, help="Binary TIFF or OME TIFF segmentation")
    parser.add_argument("output", type=Path, help="Output specimen folder")
    parser.add_argument("--id", dest="specimen_id", default=None, help="Dataset identifier")
    parser.add_argument(
        "--levels",
        nargs="+",
        type=int,
        default=[8, 4, 2, 1],
        help="Pooling factors from coarse to native. Default: 8 4 2 1",
    )
    parser.add_argument(
        "--threshold",
        type=float,
        default=0.0,
        help="Voxels greater than this value are treated as foreground",
    )
    parser.add_argument(
        "--spacing-um",
        nargs=3,
        type=float,
        metavar=("Z", "Y", "X"),
        default=None,
        help="Override voxel spacing in micrometres",
    )
    return parser.parse_args()


def ome_spacing_um(ome_xml: str | None) -> tuple[float, float, float] | None:
    if not ome_xml:
        return None

    root = ET.fromstring(ome_xml)
    ns = {"ome": "http://www.openmicroscopy.org/Schemas/OME/2016-06"}
    pixels = root.find(".//ome:Pixels", ns)
    if pixels is None:
        return None

    x = pixels.get("PhysicalSizeX")
    y = pixels.get("PhysicalSizeY")
    z = pixels.get("PhysicalSizeZ")

    if x is None or y is None or z is None:
        return None

    return float(z), float(y), float(x)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def level_name(index: int, factor: int, total: int) -> tuple[str, str]:
    if factor == 1:
        return "detail", "Native detail"

    conventional = [
        ("overview", "Overview"),
        ("preview", "Preview"),
        ("medium", "Medium"),
    ]

    if index < len(conventional):
        return conventional[index]

    return f"level-{factor}", f"Level {factor}"


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    mesh_dir = args.output / "meshes"
    mesh_dir.mkdir(exist_ok=True)

    with tifffile.TiffFile(args.input) as tif:
        volume = tif.asarray()
        ome_xml = tif.ome_metadata

    if volume.ndim != 3:
        raise ValueError(f"Expected a 3D volume, got shape {volume.shape}")

    mask = volume > args.threshold

    spacing_um = tuple(args.spacing_um) if args.spacing_um else ome_spacing_um(ome_xml)
    if spacing_um is None:
        raise ValueError(
            "Voxel spacing is missing. Supply --spacing-um Z Y X."
        )

    spacing_mm = tuple(value / 1000.0 for value in spacing_um)
    specimen_id = args.specimen_id or args.input.stem.replace(".ome", "")

    levels = []

    for index, factor in enumerate(args.levels):
        level_id, label = level_name(index, factor, len(args.levels))

        prep_start = time.perf_counter()
        if factor == 1:
            working = mask
        else:
            working = block_reduce(
                mask,
                block_size=(factor, factor, factor),
                func=np.max,
            )
        prep_seconds = time.perf_counter() - prep_start

        level_spacing = tuple(value * factor for value in spacing_mm)

        mesh_start = time.perf_counter()
        vertices, faces, _, _ = marching_cubes(
            working.astype(np.uint8),
            level=0.5,
            spacing=level_spacing,
            allow_degenerate=False,
        )
        mesh_seconds = time.perf_counter() - mesh_start

        # marching_cubes returns coordinates in Z, Y, X order.
        vertices = vertices[:, [2, 1, 0]]

        # Centre the object so the browser camera can use stable coordinates.
        centre = (vertices.min(axis=0) + vertices.max(axis=0)) / 2.0
        vertices -= centre

        mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)

        glb_path = mesh_dir / f"{level_id}.glb"
        gz_path = mesh_dir / f"{level_id}.glb.gz"

        export_start = time.perf_counter()
        glb_path.write_bytes(mesh.export(file_type="glb"))
        export_seconds = time.perf_counter() - export_start

        with glb_path.open("rb") as source, gzip.open(gz_path, "wb", compresslevel=9) as target:
            shutil.copyfileobj(source, target)

        levels.append(
            {
                "id": level_id,
                "label": label,
                "factor": factor,
                "file": f"meshes/{gz_path.name}",
                "compressedBytes": gz_path.stat().st_size,
                "uncompressedBytes": glb_path.stat().st_size,
                "vertices": int(len(vertices)),
                "triangles": int(len(faces)),
                "sha256": sha256(gz_path),
                "sourceGrid": [int(value) for value in working.shape],
                "approximation": (
                    "native segmentation"
                    if factor == 1
                    else f"max pooled by factor {factor} before surface extraction"
                ),
                "preprocessSeconds": prep_seconds,
                "meshSeconds": mesh_seconds,
                "exportSeconds": export_seconds,
            }
        )

        glb_path.unlink()

        print(
            f"{label:14s} "
            f"{len(vertices):>10,d} vertices  "
            f"{len(faces):>10,d} triangles  "
            f"{gz_path.stat().st_size / 1024**2:>7.2f} MiB compressed"
        )

    shape = np.asarray(mask.shape, dtype=float)
    spacing = np.asarray(spacing_mm, dtype=float)

    manifest = {
        "format": "banyuhay-bone-viewer",
        "version": 1,
        "id": specimen_id,
        "label": specimen_id,
        "source": {
            "kind": "binary TIFF",
            "shapeZYX": [int(value) for value in mask.shape],
            "spacingMicrometresZYX": [float(value) for value in spacing_um],
            "physicalExtentMillimetresZYX": [float(value) for value in shape * spacing],
        },
        "units": "mm",
        "levels": levels,
        "defaultLevel": levels[0]["id"],
        "progression": [level["id"] for level in levels],
        "scientificNotice": (
            "Coarse levels are navigation approximations created with max pooling. "
            "Native detail is extracted from the original segmentation."
        ),
    }

    (args.output / "manifest.json").write_text(
        json.dumps(manifest, indent=2),
        encoding="utf-8",
    )

    print(f"\nViewer folder written to {args.output}")


if __name__ == "__main__":
    main()
