// File: /21_final/end/Layers.js

// This “global” config:
const CRYSTAL_SIZE = 150; // total size for one “crystal”
const SQUARE_DIST = 100; // how far left square is offset from right square

// Our single layer
function squareShadow(props) {
  // We can store any state needed, including random colors, etc.
  const state = {
    dist: SQUARE_DIST,
    size: CRYSTAL_SIZE * 0.6, // or use a fraction of CRYSTAL_SIZE
    leftColor: "#444",
    rightColor: getRandomFromPalette(),
    shadowColor: "#444", // or random as well
    draw: props.draw,
  };

  return {
    name: "Square Shadow",
    state,
    render: () => {
      // Draw the left square, the “shadow shape,” and the right square
      push();
      noStroke();

      const d = state.dist;
      const sz = state.size;

      // Left square
      fill(state.shadowColor);
      rect(-d, d, sz, sz);

      // The “connecting shadow” shape
      beginShape();
      // top-left corner of left square
      vertex(-d - sz / 2, d - sz / 2);
      // top-left corner of right square
      vertex(-sz / 2, -sz / 2);
      // bottom-right corner of right square
      vertex(sz / 2, sz / 2);
      // bottom-right corner of left square
      vertex(-d + sz / 2, d + sz / 2);
      endShape(CLOSE);

      // Right square
      fill(state.rightColor);
      rect(0, 0, sz, sz);

      // You could layer a second fill on left square if desired:
      fill(state.leftColor);
      rect(-d, d, sz, sz);

      pop();
    },
  };
}

// The array of layer “constructors.” We have just one for simplicity.
const layerConstructors = [
  {
    name: "SquareShadowLayer",
    init: (props) => squareShadow(props),
    // If you want it always to appear, set weight = 1 and use `picker > weight`:
    // or set weight=0 so it always draws. It's up to you.
    weight: 0.0,
  },
];

// “makeCrystal” chooses whether or not each layer is drawn
// Here, we have only one layer, so we’ll always draw it if you like:
function makeCrystal(pos) {
  return layerConstructors.map((lcon) => {
    let picker = random(1);
    const draw = picker > lcon.weight; // e.g. weight=0 => always draws
    return lcon.init({ pos, draw });
  });
}
