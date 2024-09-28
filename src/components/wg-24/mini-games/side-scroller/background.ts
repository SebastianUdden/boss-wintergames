export const renderBackground = (
  context: CanvasRenderingContext2D,
  player: any,
  canvas: HTMLCanvasElement,
  backgroundImages: Record<string, HTMLImageElement>
) => {
  const cameraX = player.x - canvas.width / 2 + player.width / 2;

  // Disable image smoothing to avoid rendering artifacts
  context.imageSmoothingEnabled = false;

  const skyTileWidth = backgroundImages.sky.width;
  const seaTileWidth = backgroundImages.sea.width;
  const cloudTileWidth = backgroundImages.clouds.width;

  // Tile the sky (top part) with Math.floor to avoid subpixel gaps
  for (let i = -2; i < Math.ceil(canvas.width / skyTileWidth) + 2; i++) {
    context.drawImage(
      backgroundImages.sky,
      Math.floor(i * skyTileWidth - cameraX * 0.1), // Round to avoid subpixel issues
      0, // Positioned at the top
      skyTileWidth,
      canvas.height / 2 // Fills the top part
    );
  }

  for (let i = -2; i < Math.ceil(canvas.width / cloudTileWidth) + 5; i++) {
    // Parallax clouds
    context.drawImage(
      backgroundImages.clouds,
      Math.floor(i * skyTileWidth - cameraX * 0.2), // Apply parallax and rounding
      canvas.height / 3,
      cloudTileWidth,
      canvas.height / 3 // Positioned on top half
    );
  }

  // Tile the sea (bottom part) with Math.floor to avoid subpixel gaps
  for (let i = -2; i < Math.ceil(canvas.width / seaTileWidth) + 5; i++) {
    context.drawImage(
      backgroundImages.sea,
      Math.floor(i * seaTileWidth - cameraX * 0.3), // Round to avoid subpixel issues
      canvas.height / 1.5, // Positioned at the middle (fills bottom half)
      seaTileWidth,
      canvas.height / 3 // Adjusted height to fit proportionally
    );
  }

  // Parallax far ground
  context.drawImage(
    backgroundImages.farGround,
    Math.floor(-cameraX * 0.4), // Parallax factor and rounding
    canvas.height / 1.5, // Positioned in the middle/bottom area
    backgroundImages.farGround.width,
    canvas.height / 3
  );
};
