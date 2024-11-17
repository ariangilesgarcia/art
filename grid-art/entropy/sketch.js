const BG_COLOR = "#d6ccbf";
const STROKE_COLOR = "#333";
const N_ROWS = 10;
const N_COLS = 20;
const SQUARE_SIZE = 32;
const PADDING = 80;

function setup() {
  createCanvas(
    N_COLS * SQUARE_SIZE + PADDING * 2,
    N_ROWS * SQUARE_SIZE + PADDING * 2,
    SVG
  );
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(BG_COLOR);
  stroke(STROKE_COLOR);
  noFill();

  for (let i = 0; i < N_COLS; i++) {
    for (let j = 0; j < N_ROWS; j++) {
      push();

      translate(
        i * SQUARE_SIZE + SQUARE_SIZE / 2 + PADDING,
        j * SQUARE_SIZE + SQUARE_SIZE / 2 + PADDING
      );

      // Row 0: no rotation
      // Row N_ROWS-1: full rotation range
      let max_rotation = map(j, 0, N_ROWS - 1, 0, 60);
      let random_rotation_offset = random(0, max_rotation);

      rotate(random_rotation_offset * random([1, -1]));

      // Row 0: no distance
      // Row N_ROWS-1: full distance range
      let max_distance_offset = map(j, 0, N_ROWS - 1, 0, SQUARE_SIZE / 2);
      let random_distance_offset = random(0, max_distance_offset);

      rect(
        0 + random_distance_offset * random([1, -1]),
        0 + random_distance_offset * random([1, -1]),
        SQUARE_SIZE,
        SQUARE_SIZE
      );

      pop();
    }
  }

  pop();
}
