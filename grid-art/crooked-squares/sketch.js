const SIZE = 500;

function setup() {
  createCanvas(SIZE, SIZE, SVG);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background("#E0EFDE");
  fill("#E08D79");
  noStroke();

  let layer = new ShapeLayer();
  layer.render();

  let guidelines = new Guidelines();
  guidelines.render();
}
