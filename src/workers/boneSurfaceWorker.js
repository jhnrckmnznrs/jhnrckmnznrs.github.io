import isosurface from 'isosurface';

self.onmessage = (event) => {
  const {
    buffer,
    shapeZYX,
    spacingZYX
  } = event.data;

  const [nz, ny, nx] = shapeZYX;
  const [sz, sy, sx] = spacingZYX;
  const volume = new Uint8Array(buffer);

  const index = (x, y, z) => (z * ny + y) * nx + x;

  const potential = (x, y, z) => {
    const xi = Math.max(0, Math.min(nx - 1, Math.round(x)));
    const yi = Math.max(0, Math.min(ny - 1, Math.round(y)));
    const zi = Math.max(0, Math.min(nz - 1, Math.round(z)));
    return volume[index(xi, yi, zi)] ? -1 : 1;
  };

  const start = performance.now();
  const mesh = isosurface.marchingCubes(
    [nx, ny, nz],
    potential,
    [[0, 0, 0], [Math.max(1, nx - 1), Math.max(1, ny - 1), Math.max(1, nz - 1)]]
  );

  const positions = new Float32Array(mesh.positions.length * 3);
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (let i = 0; i < mesh.positions.length; i += 1) {
    const point = mesh.positions[i];
    const x = point[0] * sx;
    const y = point[1] * sy;
    const z = point[2] * sz;

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);

    const offset = i * 3;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
  }

  const centreX = (minX + maxX) / 2;
  const centreY = (minY + maxY) / 2;
  const centreZ = (minZ + maxZ) / 2;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] -= centreX;
    positions[i + 1] -= centreY;
    positions[i + 2] -= centreZ;
  }

  let triangleCount = 0;
  for (const cell of mesh.cells) {
    triangleCount += Math.max(0, cell.length - 2);
  }

  const indices = new Uint32Array(triangleCount * 3);
  let cursor = 0;

  for (const cell of mesh.cells) {
    for (let j = 1; j < cell.length - 1; j += 1) {
      indices[cursor++] = cell[0];
      indices[cursor++] = cell[j];
      indices[cursor++] = cell[j + 1];
    }
  }

  const buildMs = performance.now() - start;

  self.postMessage(
    {
      positions: positions.buffer,
      indices: indices.buffer,
      vertices: positions.length / 3,
      triangles: triangleCount,
      buildMs
    },
    [positions.buffer, indices.buffer]
  );
};
