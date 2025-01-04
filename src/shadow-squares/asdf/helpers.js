// File: /21_final/end/helpers.js

// Example palette
// Feel free to replace or expand:
const PALETTE = ["#ff3300", "#00ccff", "#ffcc00", "#cc00ff", "#33ff66"];

// Return a random color from the palette
const getRandomFromPalette = () => {
  const rIndex = floor(random(PALETTE.length));
  return PALETTE[rIndex];
};

// Just a helper to randomly decide if we should draw a layer
// (like your old approach with "weight"):
const shouldDraw = (weight) => {
  return random(1) > weight;
};
