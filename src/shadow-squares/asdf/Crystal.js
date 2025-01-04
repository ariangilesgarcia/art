// File: /21_final/end/Crystal.js

class Crystal {
  constructor(pos) {
    this.pos = pos;
    // Each crystal is an array of layers
    this.layers = makeCrystal(pos);
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    // Draw each layer
    this.layers.forEach((layer) => {
      if (layer.state.draw) {
        layer.render();
      }
    });
    pop();
  }
}
