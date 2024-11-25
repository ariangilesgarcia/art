const svg = false;

let params = {
  bg_color: "#b3b3b3",
  stroke_color: "#333",
  stroke_weight: 1,
  canvas_width: 500,
  canvas_height: 500,
  padding: 100,

  circle_size: 400,
  circle_color: "#70300e",

  lines_width: 10,
  lines_distance: 10,
  lines_color: "#333",
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

  // Create the GUI
  let gui = new dat.GUI();
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px"; // Move 50px down
  gui.domElement.style.left = "0px"; // Move 20px from the left

  gui
    .add(params, "stroke_weight", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());

  gui
    .add(params, "lines_width", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());

  gui
    .add(params, "lines_distance", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());

  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());
  gui.addColor(params, "circle_color").onChange(() => updateCanvas());
  gui.addColor(params, "lines_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function draw() {
  background(params.bg_color);

  let x_pos = 10;
  stroke(params.lines_color);
  strokeWeight(params.lines_width);
  while (x_pos < width / 2) {
    line(x_pos, 0, x_pos, height);
    x_pos += params.lines_width + params.lines_distance;
  }

  push();
  translate(width / 2, height / 2);
  noStroke();
  fill(params.circle_color);
  //rotate(45);
  ellipse(0, 0, params.circle_size, params.circle_size);
  pop();

  strokeWeight(params.lines_width);
  stroke(params.lines_color);
  while (x_pos < width) {
    line(x_pos, 0, x_pos, height);
    x_pos += params.lines_width + params.lines_distance;
  }
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-bauhaus-ausstellung-" + millis() + extension);
}

function updateCanvas() {
  // Recalculate canvas dimensions
  //resizeCanvas(canvas_width, canvas_height);
  redraw();
}
