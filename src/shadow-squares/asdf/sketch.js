// File: /21_final/end/sketch.js

// Number of grid columns/rows
const COLUMNS = 3;
const ROWS = 3;

// Margins / layout
const PADDING = CRYSTAL_SIZE;
const START = CRYSTAL_SIZE * 2; // first cell’s offset

let ALL_CRYSTALS = [];

function setup() {
  // Figure out total canvas size
  // E.g., each “cell” is CRYSTAL_SIZE + PADDING
  const totalX = START + (CRYSTAL_SIZE + PADDING) * COLUMNS;
  const totalY = START + (CRYSTAL_SIZE + PADDING) * ROWS;

  // Create an SVG canvas so you can save as .svg
  createCanvas(totalX, totalY, SVG);

  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background("#f0f0f0");

  // Build a grid of crystals
  for (let col = 0; col < COLUMNS; col++) {
    for (let row = 0; row < ROWS; row++) {
      const posX = START + (CRYSTAL_SIZE + PADDING) * col;
      const posY = START + (CRYSTAL_SIZE + PADDING) * row;
      const crystal = new Crystal(createVector(posX, posY));
      ALL_CRYSTALS.push(crystal);
    }
  }

  // Render them all
  ALL_CRYSTALS.forEach((crystal) => {
    crystal.render();
  });
}

// You could call this from a button in index.html
function saveSVG() {
  save("my-squares-" + millis() + ".svg");
}
