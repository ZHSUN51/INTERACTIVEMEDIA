let holder;
let stars = [];

const palette = {
  bg: "#111111",
  line: "#F4F1EA",
  muted: "#B7B09C",
  soft: "#6B6B6B"
};

function setup() {
  holder = document.getElementById("p5-holder");
  const canvas = createCanvas(holder.offsetWidth, holder.offsetHeight);
  canvas.parent("p5-holder");

  strokeCap(ROUND);
  noFill();
  buildStars();
}

function buildStars() {
  stars = [
    {
      px: 0.14,
      py: 0.18,
      outer: min(width, height) * 0.075,
      inner: min(width, height) * 0.033,
      driftX: 0.45,
      driftY: 0.18,
      phase: random(TWO_PI),
      side: "right"
    },
    {
      px: 0.82,
      py: 0.16,
      outer: min(width, height) * 0.065,
      inner: min(width, height) * 0.028,
      driftX: -0.38,
      driftY: 0.16,
      phase: random(TWO_PI),
      side: "left"
    },
    {
      px: 0.40,
      py: 0.56,
      outer: min(width, height) * 0.10,
      inner: min(width, height) * 0.043,
      driftX: 0.3,
      driftY: -0.12,
      phase: random(TWO_PI),
      side: "left"
    },
    {
      px: 0.74,
      py: 0.68,
      outer: min(width, height) * 0.075,
      inner: min(width, height) * 0.033,
      driftX: -0.25,
      driftY: 0.14,
      phase: random(TWO_PI),
      side: "left"
    }
  ];
}

function draw() {
  background(palette.bg);

  drawAtmosphere();
  drawStarsAndTrails();
}

function drawAtmosphere() {
  stroke(107, 107, 107, 28);
  strokeWeight(1);

  for (let y = 40; y < height; y += 42) {
    const offset = sin(frameCount * 0.003 + y * 0.01) * 18;
    line(0 + offset, y, width - offset, y);
  }
}

function drawStarsAndTrails() {
  const mouseFactor = map(mouseX, 0, width, 0.75, 1.35);
  const driftFactor = map(mouseY, 0, height, 0.7, 1.25);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];

    const x =
      s.px * width +
      sin(frameCount * 0.01 + s.phase) * 18 * driftFactor +
      cos(frameCount * 0.006 + s.phase) * 8;

    const y =
      s.py * height +
      cos(frameCount * 0.008 + s.phase) * 16 +
      sin(frameCount * 0.004 + s.phase) * 10 * driftFactor;

    const lineCount = 6 + i;
    const lineGap = 14;
    const trailLength = 120 * mouseFactor + i * 18;

    // trailing lines
    stroke(183, 176, 156, 150);
    strokeWeight(2);

    for (let n = 0; n < lineCount; n++) {
      const yy = y + (n - lineCount / 2) * lineGap;
      const wobble = sin(frameCount * 0.03 + n + i) * 8;

      if (s.side === "left") {
        line(x - trailLength + wobble, yy, x - s.outer * 0.6, yy);
      } else {
        line(x + s.outer * 0.6, yy, x + trailLength + wobble, yy);
      }
    }

    // star outline
    push();
    translate(x, y);
    rotate(sin(frameCount * 0.004 + s.phase) * 0.08);

    stroke(244, 241, 234, 220);
    strokeWeight(2.2);
    drawStar(0, 0, s.inner, s.outer, 5);

    pop();
  }
}

function drawStar(x, y, radius1, radius2, points) {
  beginShape();
  let angle = TWO_PI / points;
  let halfAngle = angle / 2.0;

  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);

    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }

  endShape(CLOSE);
}

function mousePressed() {
  for (let s of stars) {
    s.px = random(0.12, 0.88);
    s.py = random(0.14, 0.82);
    s.phase = random(TWO_PI);
    s.side = random() > 0.5 ? "left" : "right";
  }
}

function windowResized() {
  resizeCanvas(holder.offsetWidth, holder.offsetHeight);
  buildStars();
}