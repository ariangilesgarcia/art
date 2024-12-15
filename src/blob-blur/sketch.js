const svg = false;

let params = {
  bg_color_1: "#C0965A",
  bg_color_2: "#95634B",
  stroke_color: "#eee",
  stroke_weight: 3,
  canvas_width: 200,
  canvas_height: 200,
  padding: 100,

  blob_radius: 100,
  blob_resolution: 4,
  blob_count: 3,
  blob_percentage_reduction: 0.11,
};

let blob_angle;

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

  blob_angle = 360 / params.blob_resolution;
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);

  // Create the GUI
  let gui = new dat.GUI();
  gui.domElement.style.position = "absolute";
  gui.domElement.style.top = "0px";
  gui.domElement.style.left = "0px";
  gui
    .add(params, "stroke_weight", 1, 32)
    .step(1)
    .onChange(() => updateCanvas());
  gui.addColor(params, "bg_color_1").onChange(() => updateCanvas());
  gui.addColor(params, "bg_color_2").onChange(() => updateCanvas());
  gui.addColor(params, "stroke_color").onChange(() => updateCanvas());

  // Close the GUI by default
  gui.close();
}

function draw() {
  radialGradient(
    width / 2,
    height / 2,
    0, // Start radius
    width / 2,
    height / 2,
    max(width, height) / 2, // End radius
    color(params.bg_color_1), // Start color
    color(params.bg_color_2) // End color
  );

  stroke(params.stroke_color);
  strokeWeight(params.stroke_weight);
  noFill();

  // Use a local variable to avoid modifying `params.blob_radius`
  let currentBlobRadius = params.blob_radius;

  for (let l = 0; l < params.blob_count; l++) {
    let blobVertex = [];

    // Calculate the current blob radius for this iteration
    let radius = currentBlobRadius * (1 - params.blob_percentage_reduction * l);

    let xCenterOffset = random(0, radius * 0.15) * random([-1, 1]);
    let yCenterOffset = random(0, radius * 0.15) * random([-1, 1]);

    push();
    translate(width / 2 + xCenterOffset, height / 2 + yCenterOffset);

    beginShape();

    for (var i = 0; i < params.blob_resolution; i++) {
      let random_radius_x = random(-2, 2);
      let random_radius_y = random(-2, 2);
      var x = radius * cos((blob_angle + random_radius_x) * i);
      var y = radius * sin((blob_angle + random_radius_y) * i);

      blobVertex.push({
        radius: radius,
        x: x,
        y: y,
      });

      curveVertex(x, y);
    }
    curveVertex(blobVertex[0].x, blobVertex[0].y);
    curveVertex(blobVertex[1].x, blobVertex[1].y);
    curveVertex(blobVertex[2].x, blobVertex[2].y);

    endShape();

    filter(BLUR, params.blob_count - l);
    pop();
  }
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  gradient.addColorStop(0, colorS.toString());
  gradient.addColorStop(1, colorE.toString());

  drawingContext.fillStyle = gradient;
  noStroke();
  rect(0, 0, width * 2, height * 2);
}

function doubleClicked() {
  let extension = svg ? ".svg" : ".png";
  save("arian-color-shapes-" + millis() + extension);
}

function updateCanvas() {
  redraw();
}
