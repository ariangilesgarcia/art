let params = {
  bg_color: "#edddd1",
  stroke_color: "#555",
  n_rows: 12,
  n_cols: 8,
  square_size: 32,
  padding: 80,
};

function setup() {
  canvas_width = params.n_cols * params.square_size + params.padding * 2;
  canvas_height = params.n_rows * params.square_size + params.padding * 2;

  createCanvas(canvas_width, canvas_height, SVG);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);

  // Create the GUI
  let gui = new dat.GUI();
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px"; // Move 50px down
  gui.domElement.style.left = "0px"; // Move 20px from the left
  gui
    .add(params, "n_rows", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "n_cols", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "square_size", 10, 100)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "padding", 0, 200)
    .step(1)
    .onChange(() => updateCanvas());
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());
}

function updateCanvas() {
  // Recalculate canvas dimensions
  canvas_width = params.n_cols * params.square_size + params.padding * 2;
  canvas_height = params.n_rows * params.square_size + params.padding * 2;

  resizeCanvas(canvas_width, canvas_height);
  redraw();
}

function draw() {
  background(params.bg_color);
  stroke(params.stroke_color);
  noFill();
  for (let i = 0; i < params.n_cols; i++) {
    for (let j = 0; j < params.n_rows; j++) {
      push();
      translate(
        i * params.square_size + params.square_size / 2 + params.padding,
        j * params.square_size + params.square_size / 2 + params.padding
      );
      // Row 0: no rotation
      // Row N_ROWS-1: full rotation range
      let max_rotation = map(j, 0, params.n_rows - 1, 0, 60);
      let random_rotation_offset = random(0, max_rotation);
      rotate(random_rotation_offset * random([1, -1]));
      // Row 0: no distance
      // Row N_ROWS-1: full distance range
      let max_distance_offset = map(
        j,
        0,
        params.n_rows - 1,
        0,
        params.square_size * 0.75
      );
      let random_distance_offset = random(0, max_distance_offset);
      rect(
        0 + random_distance_offset * random([1, -1]),
        0 + random_distance_offset * random([1, -1]),
        params.square_size,
        params.square_size
      );
      pop();
    }
  }
}

function doubleClicked() {
  save("arian-entropy-" + millis() + ".svg");
}
