const svg = false;

let params = {
  bg_color: "#333",
  stroke_color: "#eee",
  stroke_weight: 12,
  canvas_width: 500,
  canvas_height: 500,
  padding: 100,
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
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function draw() {
  background(params.bg_color);
  stroke(params.stroke_color);
  strokeWeight(params.stroke_weight);
  noFill();

  push();
  translate(width / 2, height / 2);
  rotate(45);
  rect(0, 0, 150, 150);
  pop();
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-color-shapes-" + millis() + extension);
}

function updateCanvas() {
  // Recalculate canvas dimensions
  //resizeCanvas(canvas_width, canvas_height);
  redraw();
}
