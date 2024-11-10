function setup() {
  createCanvas(500, 500, SVG);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background("teal");
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  rect(0, 0, 150, 150);
  pop();

  fill("red");
  rect(100, 100, 100, 100);
}
