// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
  };
  p.draw = function () {
    // background for the page
    p.background(220);

    // responsive pool dimensions
    const marginX = p.width * 0.1;
    const marginY = p.height * 0.1;
    const poolW = p.width - marginX * 2;

    const poolH = Math.min(p.height * 0.6, poolW * 0.45);
    const cx = p.width / 2;
    const cy = p.height / 2;

    p.noStroke();
    p.fill(30, 90, 160, 140);
    p.rect(cx + 6, cy + 8, poolW, poolH, 12);
    p.fill(50, 150, 255);
    p.rect(cx, cy, poolW, poolH, 12);

    p.noStroke();
    p.fill(255);
    const numDashes = 7;
    const dashW = Math.max(10, poolW * 0.03);
    const dashH = Math.max(2, poolH * 0.02);
    const spacing = dashW * 1.5;
    const startX = cx - (spacing * (numDashes - 1)) / 2;
    for (let i = 0; i < numDashes; i++) p.rect(startX + i * spacing, cy, dashW, dashH, 2);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

  
});