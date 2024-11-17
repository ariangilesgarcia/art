const FACTOR = 1;

class Layer {
  constructor(x, y, size) {
    this.color = "#573280";
    this.stroke_color = "#ADA8B6";
    this.canvas_size = size * FACTOR;
    this.guidelines_color = "rgba(0, 0, 0, 0.33)";

    this.x = x;
    this.y = y;
    this.size = size;
  }

  drawGuidelines() {
    noFill();
    stroke(this.guidelines_color);

    push();
    translate(this.x + this.canvas_size / 2, this.y + this.canvas_size / 2);
    rect(0, 0, this.canvas_size, this.canvas_size);
    ellipse(0, 0, this.canvas_size, this.canvas_size);
    pop();
  }
}

class ShapeLayer extends Layer {
  constructor(x, y, size) {
    super(x, y, size);

    this.angle = random(0, 360);
    this.offset = random(this.canvas_size * 0.03, this.canvas_size * 0.05);
    this.max_size =
      this.canvas_size /
      (Math.abs(Math.cos(radians(this.angle))) +
        Math.abs(Math.sin(radians(this.angle))));
    this.shape = "square"; // TODO: random
    this.size = random(0.35 * this.max_size, this.max_size);
    this.randomRadiusTL = 0;
    this.randomRadiusTR = 0;
    this.randomRadiusBL = 0;
    this.randomRadiusBR = 0;
  }

  render() {
    fill(this.color);
    switch (this.shape) {
      case "square":
        this.drawSquare();
        break;
      case "circle":
        this.drawCircle();
        break;
      case "triangle":
        break;
      case "hexagon":
        break;
      default:
    }

    //this.drawGuidelines();
  }

  drawSquare() {
    push();
    translate(this.x + this.canvas_size / 2, this.y + this.canvas_size / 2);
    rotate(this.angle);
    // Main shape
    rect(
      0,
      0,
      this.size - this.offset,
      this.size - this.offset,
      this.randomRadiusTL,
      this.randomRadiusTR,
      this.randomRadiusBL,
      this.randomRadiusBR
    );
    // Shadow
    noFill();
    stroke(this.stroke_color);
    rect(
      0 + this.offset,
      0 + this.offset,
      this.size - this.offset,
      this.size - this.offset,
      this.randomRadiusTL,
      this.randomRadiusTR,
      this.randomRadiusBL,
      this.randomRadiusBR
    );
    pop();
  }

  drawCircle() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    ellipse(0, 0, this.size, this.size);
    pop();
  }
}
