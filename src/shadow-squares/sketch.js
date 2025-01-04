const svg = false;

let params = {
  bg_color: "#eee",
  canvas_width: 500,
  canvas_height: 500,
  padding: 100,
  square_distance: 200,
  square_size: 150,
  square_color: "#ff3300",
  shadow_color: "#333",
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
    .add(params, "square_size", 1, 200)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "square_distance", 1, 200)
    .step(1)
    .onChange(() => updateCanvas());
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "square_color").onChange(() => updateCanvas());
  gui.addColor(params, "shadow_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function draw() {
  background(params.bg_color);

  noFill();
  noStroke();

  let dist = params.square_distance;
  let size = params.square_size;

  push();
  translate(width / 2, height / 2);
  translate(dist / 2, -dist / 2);
  // rotate(45);

  fill(params.shadow_color);
  rect(-dist, dist, size, size);

  // Start drawing the shape.

  beginShape();
  // 1) Top-left corner of the left square
  vertex(-dist - size / 2, dist - size / 2);

  // 2) Top-left corner of the right square
  vertex(-size / 2, -size / 2);

  // 3) Bottom-right corner of the right square
  vertex(size / 2, size / 2);

  // 4) Bottom-right corner of the left square
  vertex(-dist + size / 2, dist + size / 2);
  endShape(CLOSE);

  fill(params.square_color);
  rect(0, 0, size, size);

  pop();
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-shadow-squares-" + millis() + extension);
}

function updateCanvas() {
  // Recalculate canvas dimensions
  //resizeCanvas(canvas_width, canvas_height);
  redraw();
}
