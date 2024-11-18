const svg = false;

// Default params
let params = {
  bg_color: "#274686",

  colors: ["#FAB059", "#D90368", "#EECC77", "#3F5F9F"],

  canvas_width: 800,
  canvas_height: 400,

  padding: 100,

  size: 100,
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

  // Add params to GUI
  gui
    .add(params, "size")
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "canvas_width")
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "canvas_height")
    .step(1)
    .onChange(() => updateCanvas());
  gui
    .add(params, "padding")
    .step(1)
    .onChange(() => updateCanvas());
  gui.addColor(params, "bg_color").onChange(() => updateCanvas());

  // By default, it's closed
  gui.close();
}

function draw() {
  p5grain.setup();

  background(params.bg_color);

  let n_rows = params.canvas_width / params.size;
  let n_cols = params.canvas_height / params.size;

  let functions = [
    drawConcentricRectangles,
    drawDiamond,
    drawDiagonal,
    drawStripes,
    drawArc,
    drawSpikes,
    drawCircleGrid,
    drawHourglass,
  ];

  for (let i = 0; i < n_rows; i++) {
    for (let j = 0; j < n_cols; j++) {
      let fn = random(functions);
      fn(
        params.size * i + params.padding,
        params.size * j + params.padding,
        params.size,
        params.size
      );

      //drawConcentricRectangles(params.size * i, params.size * j, params.size, params.size);
      //drawDiamond(params.size * i, params.size * j, params.size, params.size);
      //drawDiagonal(params.size * i, params.size * j, params.size, params.size);
      //drawStripes(params.size * i, params.size * j, params.size, params.size);
      //drawArc(params.size * i, params.size * j, params.size, params.size);
      //drawSpikes(params.size * i, params.size * j, params.size, params.size);
      //drawCircleGrid(params.size * i, params.size * j, params.size, params.size);
      //drawHourglass(params.size * i, params.size * j, params.size, params.size);
    }
  }

  if (!svg) {
    applyMonochromaticGrain(12);
  }
}

function updateCanvas() {
  resizeCanvas(
    params.canvas_width + params.padding * 2,
    params.canvas_height + params.padding * 2
  );
  redraw();
}

function drawConcentricRectangles(x, y, w, h) {
  noStroke();

  const innerFactor = 0.6;

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let outterColor = random(params.colors);
  fill(outterColor);
  rect(0, 0, size_w, size_h);

  let remainingColors = params.colors.filter((c) => c !== outterColor);
  let innerColor = random(remainingColors);
  fill(innerColor);
  rect(0, 0, size_w * innerFactor, size_h * innerFactor);

  pop();
}

function drawDiamond(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let outterColor = random(params.colors);
  fill(outterColor);
  rect(0, 0, size_w, size_h);

  let remainingColors = params.colors.filter((c) => c !== outterColor);
  let innerColor = random(remainingColors);
  fill(innerColor);
  rotate(45);
  rect(0, 0, size_w * cos(45), size_h * cos(45));

  pop();
}

function drawDiagonal(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  if (random([true, false])) {
    rotate(90);
  }

  let outterColor = random(params.colors);
  fill(outterColor);
  let x1 = -size_w / 2;
  let y1 = -size_h / 2;
  triangle(x1, y1, x1 + size_w, y1, x1, y1 + size_w);

  let remainingColors = params.colors.filter((c) => c !== outterColor);
  let innerColor = random(remainingColors);
  fill(innerColor);
  rotate(180);
  triangle(x1, y1, x1 + size_w, y1, x1, y1 + size_w);

  pop();
}

function drawStripes(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let color = random(params.colors);
  fill(color);
  rect(0, 0 - size_w / 3, size_w, size_h / 3);

  fill(color);
  rect(0, 0 + size_w / 3, size_w, size_h / 3);

  pop();
}

function drawArc(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let angle = random([0, 90, 180, 270]);
  rotate(angle);

  let squareColor = random(params.colors);
  fill(squareColor);
  rect(0, 0, size_w, size_h);

  let remainingColors = params.colors.filter((c) => c !== squareColor);
  let arcColor = random(remainingColors);
  fill(arcColor);
  arc(0 - size_w / 2, 0 - size_h / 2, size_w * 2, size_h * 2, 0, 90);

  pop();
}

function drawSpikes(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let color = random(params.colors);
  fill(color);

  let x1 = -size_w / 2;
  let y1 = -size_h / 2;
  triangle(x1, y1, x1 + size_w / 2, y1, x1, y1 + size_w);
  triangle(x1 + size_w / 2, y1, x1 + size_w, y1, x1 + size_w / 2, y1 + size_w);

  pop();
}

function drawCircleGrid(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  let n_rows = 3;
  let n_cols = 3;
  let circleSizeW = size_w / n_cols;
  let circleSizeH = size_h / n_rows;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  let color = random(params.colors);
  fill(color);

  let middle_rows = floor(n_rows / 2);
  let middle_cols = floor(n_cols / 2);

  for (let row = -middle_rows; row <= middle_rows; row++) {
    for (let col = -middle_cols; col <= middle_cols; col++) {
      ellipse(col * circleSizeW, row * circleSizeH, circleSizeW, circleSizeH);
    }
  }

  pop();
}

function drawHourglass(x, y, w, h) {
  noStroke();

  let size_w = w;
  let size_h = h;

  push();

  translate(x + size_w / 2, y + size_h / 2);

  if (random([true, false])) {
    rotate(90);
  }

  let color = random(params.colors);
  fill(color);
  let x1 = -size_w / 2;
  let y1 = -size_h / 2;
  triangle(x1, y1, x1 + size_w / 2, y1 + size_h / 2, x1, y1 + size_w);
  rotate(180);
  triangle(x1, y1, x1 + size_w / 2, y1 + size_h / 2, x1, y1 + size_w);

  pop();
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-color-shapes-" + millis() + extension);
}
