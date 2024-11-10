const FACTOR = 0.875;
const MAX_SIZE = SIZE * FACTOR;

class Layer {
  constructor() {
    this.canvas_size = MAX_SIZE * FACTOR;
  }
}

class ShapeLayer extends Layer {
  constructor() {
    super();

    this.angle = random(0, 360);
    this.max_size =
      this.canvas_size /
      (Math.abs(Math.cos(radians(this.angle))) +
        Math.abs(Math.sin(radians(this.angle))));
    this.shape = "square"; // TODO: random
    this.size = random(0.2 * this.max_size, this.max_size);
    this.randomRadiusTL = 0;
    this.randomRadiusTR = 0;
    this.randomRadiusBL = 0;
    this.randomRadiusBR = 0;
  }

  render() {
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
  }

  drawSquare() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    rect(
      0,
      0,
      this.size,
      this.size,
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

class Guidelines {
  constructor() {
    this.color = "rgba(0, 0, 0, 0.33)";
  }

  render() {
    noFill();
    stroke(this.color);

    push();
    translate(width / 2, height / 2);
    rect(0, 0, MAX_SIZE, MAX_SIZE);
    ellipse(0, 0, MAX_SIZE, MAX_SIZE);
    pop();
  }
}
