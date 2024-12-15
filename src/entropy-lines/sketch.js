const svg = false;

let params = {
  bg_color: "#0f0f0f",
  stroke_color: "#eee",
  stroke_weight: 2,
  canvas_width: 640,
  canvas_height: 480,
  padding: 200,
  num_lines: 10,
  noise_scale: 0.02,
  noise_scale_increment: 0.005,
  max_noise_strength: 100,
  max_blur: 8,
  apply_blur: true,
  inverted_blur: false,
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

  // Create the GUI
  let gui = new dat.GUI();
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px";
  gui.domElement.style.left = "0px";
  gui
    .add(params, "num_lines", 1, 20)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "noise_scale", 0.001, 0.1)
    .step(0.001)
    .onChange(() => updateCanvas());
  gui
    .add(params, "noise_scale_increment", 0, 0.02)
    .step(0.001)
    .onChange(() => updateCanvas());
  gui
    .add(params, "max_noise_strength", 0, 200)
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "max_blur", 0, 20)
    .step(0.1)
    .onChange(() => updateCanvas());
  gui.add(params, "apply_blur").onChange(() => updateCanvas());
  gui.add(params, "inverted_blur").onChange(() => updateCanvas());
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

  drawNoiseLinesWithBlur();
}

function drawNoiseLinesWithBlur() {
  const line_spacing = (height - params.padding * 2) / (params.num_lines - 1);

  for (let i = 0; i < params.num_lines; i++) {
    let y = params.padding + i * line_spacing;

    let noise_strength =
      (i / (params.num_lines - 1)) * params.max_noise_strength;

    let noise_scale = params.noise_scale + i * params.noise_scale_increment;

    if (params.apply_blur) {
      let blur_amount = params.inverted_blur
        ? map(i, 0, params.num_lines - 1, params.max_blur, 0)
        : map(i, 0, params.num_lines - 1, 0, params.max_blur);
      drawingContext.save();
      drawingContext.filter = `blur(${blur_amount}px)`;
    }

    beginShape();
    for (let x = params.padding; x < width - params.padding; x++) {
      let noise_offset =
        noise(x * noise_scale, i * 100) * noise_strength - noise_strength / 2;
      vertex(x, y + noise_offset);
    }
    endShape();

    drawingContext.restore(); // Restore context to prevent blur from affecting the next lines
  }
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-noise-lines-" + millis() + extension);
}

function updateCanvas() {
  // Trigger a complete redraw
  redraw();
}
