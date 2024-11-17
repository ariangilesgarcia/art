const SIZE = 500;
const N = 4;
const layers = [];

function setup() {
  createCanvas(SIZE, SIZE, SVG);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background("#abcdef");
  noStroke();

  let size = SIZE / N;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      layers.push(new ShapeLayer(size * i, size * j, size));
    }
  }

  for (let layer of layers) {
    layer.render();
  }
}

function mousePressed() {
  draw();
}
