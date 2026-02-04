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
    // choose pool height as a fraction but keep it reasonable on tall screens
    const poolH = Math.min(p.height * 0.6, poolW * 0.45);
    const cx = p.width / 2;
    const cy = p.height / 2;

    // pool shadow / border
    p.noStroke();
    p.fill(30, 90, 160, 140);
    p.rect(cx + 6, cy + 8, poolW, poolH, 12);

    // main pool (blue)
    p.fill(50, 150, 255);
    p.rect(cx, cy, poolW, poolH, 12);

    const ringDiameter = Math.min(poolW, poolH) * 0.7;
    const ringThickness = ringDiameter * 0.08;
    
    p.noFill();
    p.stroke(255, 220, 0);
    p.strokeWeight(ringThickness);
    p.ellipse(cx, cy, ringDiameter, ringDiameter);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

  
});