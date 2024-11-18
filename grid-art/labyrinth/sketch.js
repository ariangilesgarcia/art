const svg = false;

let params = {
  bg_color: "#333",
  stroke_color: "#eee",
  line_stroke: 12,
  canvas_width: 500,
  canvas_height: 500,
  padding: 100,
};

// Load the image.
function preload() {
  img = loadImage("bg.png");
}

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
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function updateCanvas() {
  // Recalculate canvas dimensions
  //resizeCanvas(canvas_width, canvas_height);
  redraw();
}

function draw() {
  p5grain.setup();

  background(params.bg_color);
  img = duotone(img, color(0, 50, 174), color(255, 255, 0));
  image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
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

      let ellipse_size = map(j, 0, n_squares, 1, 50);
      ellipse(0, 0, ellipse_size, ellipse_size);

      pop();
    }
  }

  if (!svg) {
    applyMonochromaticGrain(12);
  }
}

function duotone(input, c1, c2) {
  // go through all pixels in the image
  input.loadPixels();
  for (let y = 0; y < input.height; y++) {
    for (let x = 0; x < input.width; x++) {
      // get the red pixel value (an approx
      // of brightness)
      let bright = input.get(x, y)[0];

      // lerpColor() needs values 0–1, so
      // divide by 255
      bright /= 255;

      // create a new color for the pixel that's
      // somewhere between the two colors we
      // specified, then set the pixel to that color
      let newColor = lerpColor(c1, c2, bright);
      input.set(x, y, newColor);
    }
  }

  // all done, send the processed image back!
  input.updatePixels();
  return input;
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-color-shapes-" + millis() + extension);
}
