// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let startTime;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    startTime = p.millis();
  };

  p.draw = function () {
    p.background(220);

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

    const ringWidth = poolW * 0.8;
    const ringHeight = poolH * 0.6;
    const ringThickness = Math.min(ringWidth, ringHeight) * 0.02;
    
    p.noFill();
    p.stroke(255, 220, 0);
    p.strokeWeight(ringThickness);
    p.ellipse(cx, cy, ringWidth, ringHeight);
    
    const elapsedMillis = p.millis() - startTime;
    const elapsedSeconds = elapsedMillis / 1000;
    

    const timePosition = (elapsedSeconds / 60) % 60;

    // tick marks at 0, 15, 30, 45 minutes
    const tickPositions = [0, 15, 30, 45]; // minutes
    const tickLength = ringThickness * 2.5;
    
    p.strokeWeight(3);
    p.stroke(255, 255, 255);

    for (let i = 0; i < tickPositions.length; i++) {
      const angle = p.map(tickPositions[i], 0, 60, 0, p.TWO_PI) - p.HALF_PI;
      
      const outerX = cx + (ringWidth / 2) * p.cos(angle);
      const outerY = cy + (ringHeight / 2) * p.sin(angle);
      
      const innerX = cx + ((ringWidth / 2) - tickLength) * p.cos(angle);
      const innerY = cy + ((ringHeight / 2) - tickLength) * p.sin(angle);
      
      p.line(innerX, innerY, outerX, outerY);
    }

    if (elapsedMinutes < 60) {
      const swimmerAngle = p.map(elapsedMinutes, 0, 60, 0, p.TWO_PI) - p.HALF_PI;
      const swimmerX = cx + (ringWidth / 2) * p.cos(swimmerAngle);
      const swimmerY = cy + (ringHeight / 2) * p.sin(swimmerAngle);

      // draw black dot as swimmer
      const swimmerSize = Math.min(ringWidth, ringHeight) * 0.05;
      p.noStroke();
      p.fill(0);
      p.ellipse(swimmerX, swimmerY, swimmerSize, swimmerSize);
    }

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
  
});