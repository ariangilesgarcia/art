const svg = false;

let params = {
  bg_color: "#333",
  stroke_color: "#ccc",
  line_stroke: 12,
  canvas_width: 500,
  canvas_height: 500,
  padding: 100,
  min_circle_size: 5,
  max_circle_size: 35,
};

function setup() {
  if (svg) {
    createCanvas(
      params.canvas_width + params.padding * 2,
      params.canvas_height + params.padding * 2,
      SVG
    );
  } else {
    createCanvas(
      params.canvas_width + params.padding * 2,
      params.canvas_height + params.padding * 2
    );
  }

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
  strokeCap(ROUND);

  // Create the GUI
  let gui = new dat.GUI();
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px"; // Move 50px down
  gui.domElement.style.left = "0px"; // Move 20px from the left
  gui
    .add(params, "line_stroke", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "min_circle_size", 1, 50)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "max_circle_size", 1, 50)
    .step(1)
    .onChange(() => updateCanvas());
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function updateCanvas() {
  // Recalculate canvas dimensions
  redraw();
}

function draw() {
  p5grain.setup();

  background(params.bg_color);

  noFill();
  stroke(params.stroke_color);
  strokeWeight(params.line_stroke);

  let n_squares = 10;
  let square_size = params.canvas_height / n_squares;

  for (let i = 0; i < n_squares; i++) {
    for (let j = 0; j < n_squares; j++) {
      push();
      translate(
        params.padding + square_size * i,
        params.padding + square_size * j
      );

      // Labyrinth
      if (random([true, false])) {
        line(0, 0, square_size, square_size);
      } else {
        line(square_size, 0, 0, square_size);
      }

      // Circles
      noStroke();
      fill(params.stroke_color);

      let ellipse_size = map(
        j,
        0,
        n_squares,
        params.min_circle_size,
        params.max_circle_size
      );
      ellipse(0, 0, ellipse_size, ellipse_size);

      pop();
    }
  }

  if (!svg) {
    applyMonochromaticGrain(6);
  }
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-color-shapes-" + millis() + extension);
}
