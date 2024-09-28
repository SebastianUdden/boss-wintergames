export const levelData = [
  "..........................................................................",
  "..........................................................................",
  "..........................................................................",
  "..........................................................................",
  "..........................................................................",
  "..........................................................................",
  "..........................................................................",
  "...............................o....................................O.....",
  "T....t..T..................o....................................O.........",
  "........................O....................................O............",
  "...........S....................................S.........................",
  "cbl.cnbl.Xvnvvncvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
];

const ts = 32; // Tile size

// Initial tileMap with only background tiles
const initialTileMap: Record<
  string,
  {
    x: number;
    y: number;
    width: number;
    height: number;
    layer: "background" | "foreground";
    shiftY?: number;
  }
> = {
  x: {
    x: ts * 4.5,
    y: ts * 3,
    width: ts,
    height: ts * 2,
    layer: "background",
    shiftY: 16,
  },
  c: {
    x: ts,
    y: ts * 5.5,
    width: ts,
    height: ts * 4,
    layer: "background",
  },
  v: {
    x: ts * 1.5,
    y: ts * 5.5,
    width: ts,
    height: ts * 4,
    layer: "background",
  },
  b: {
    x: ts * 2.5,
    y: ts * 5.5,
    width: ts,
    height: ts * 4,
    layer: "background",
  },
  n: {
    x: ts * 6,
    y: ts * 5.5,
    width: ts * 1.5,
    height: ts * 2,
    layer: "background",
  },
  m: {
    x: ts * 8,
    y: ts * 5.5,
    width: ts * 1.5,
    height: ts * 2,
    layer: "background",
  },
  l: {
    x: ts * 16,
    y: ts * 5.5,
    width: ts * 1.5,
    height: ts * 4,
    layer: "background",
  },
  o: {
    x: ts,
    y: 0,
    width: ts * 4,
    height: ts * 3,
    layer: "background",
  },
  t: {
    x: ts * 6,
    y: ts * 1.5,
    width: ts * 4,
    height: ts * 4,
    layer: "background",
  },
  // Add more mappings here as needed
};

// Duplicate entries for uppercase keys with layer set to "foreground"
const tileMap: Record<
  string,
  {
    x: number;
    y: number;
    width: number;
    height: number;
    layer: "background" | "foreground";
    shiftY?: number;
  }
> = {};

// Populate tileMap with both background and foreground tiles
for (const key in initialTileMap) {
  const tile = initialTileMap[key];

  // Add the original key (background layer)
  tileMap[key] = tile;

  // Create uppercase key for foreground layer
  const uppercaseKey = key.toUpperCase();
  if (uppercaseKey !== key) {
    tileMap[uppercaseKey] = {
      ...tile,
      layer: "foreground",
    };
  }
}
export const renderLevel = (
  context: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number,
  backgroundImages: Record<string, HTMLImageElement>,
  layer: "background" | "foreground" // Accept layer parameter
) => {
  const tileset = backgroundImages.tileset; // Use the loaded tileset image

  // Ensure the tileset image is loaded before rendering
  if (!tileset) {
    console.error("Tileset image not loaded.");
    return;
  }

  // Iterate over the level data and draw tiles
  for (let row = 0; row < levelData.length; row++) {
    for (let col = 0; col < levelData[row].length; col++) {
      const char = levelData[row][col];

      const tile = tileMap[char];

      // Check if the tile exists and matches the specified layer
      if (tile && tile.layer === layer) {
        // Calculate tile's position relative to the camera
        const x = col * ts - cameraX;
        const y = row * ts - cameraY - (tile.shiftY ?? 0);

        // Draw the tile using the tileset image
        context.drawImage(
          tileset,
          tile.x,
          tile.y, // Source position in tileset
          tile.width,
          tile.height, // Source width and height in tileset
          x,
          y, // Destination position on canvas
          tile.width,
          tile.height // Destination size on canvas
        );
      }
    }
  }
};
