// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let startTime;
  let swimmerImg;

  p.preload = function () {
    swimmerImg = p.loadImage(`images/swimmer.png`);
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    p.imageMode(p.CENTER);
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

    const borderWidth = 8;
    p.fill(255);
    p.noStroke();
    p.rect(cx, cy, poolW + borderWidth * 2, poolH + borderWidth * 2, 12);

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

    let adjustedTime = elapsedSeconds;
    let isOnBreak = false;
    let breakTimeRemaining = 0;

    if (elapsedSeconds >= 900 && elapsedSeconds < 1200) {
      isOnBreak = true;
      breakTimeRemaining = 300 - (elapsedSeconds - 900);
      adjustedTime = 900;
    } else if (elapsedSeconds >= 1200 && elapsedSeconds < 2100) {
      adjustedTime = 900 + (elapsedSeconds - 1200);
    } else if (elapsedSeconds >= 2100 && elapsedSeconds < 2400) {
      isOnBreak = true;
      breakTimeRemaining = 300 - (elapsedSeconds - 2100);
      adjustedTime = 1800;
    } else if (elapsedSeconds >= 2400 && elapsedSeconds < 3300) {
      adjustedTime = 1800 + (elapsedSeconds - 2400);
    } else if (elapsedSeconds >= 3300 && elapsedSeconds < 3600) {
      isOnBreak = true;
      breakTimeRemaining = 300 - (elapsedSeconds - 3300);
      adjustedTime = 2700;
    } else if (elapsedSeconds >= 3600) {
      adjustedTime = 2700 + (elapsedSeconds - 3600);
    }
    
    const timePosition = (elapsedSeconds / 60) % 60;

    if (isOnBreak) {
      const breakMinutes = Math.floor(breakTimeRemaining / 60);
      const breakSeconds = Math.floor(breakTimeRemaining % 60);
      const breakDisplay = "Break: " + breakMinutes + ":" + (breakSeconds < 10 ? "0" : "") + breakSeconds;
      
      p.fill(255, 100, 100);
      p.noStroke();
      p.rect(cx, cy - poolH / 2 - 60, 200, 50, 10);
      
      p.fill(255); 
      p.textSize(24);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(breakDisplay, cx, cy - poolH / 2 - 60);
    }

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

      p.stroke(255, 255, 255);
      p.strokeWeight(3);
      p.line(innerX, innerY, outerX, outerY);

      if (tickPositions[i] !== 0) {
        const labelDistance = 40; 
        const labelX = cx + ((ringWidth / 2) + labelDistance) * p.cos(angle);
        const labelY = cy + ((ringHeight / 2) + labelDistance) * p.sin(angle);
    
        p.fill(255); 
        p.noStroke();
        p.textSize(Math.min(ringWidth, ringHeight) * 0.04);
        p.textStyle(p.BOLD);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(tickPositions[i], labelX, labelY);
      }
    }

    const topAngle = p.map(0, 0, 60, 0, p.TWO_PI) - p.HALF_PI;
    const topTickX = cx + (ringWidth / 2) * p.cos(topAngle);
    const topTickY = cy + (ringHeight / 2) * p.sin(topAngle);
    
    const labelOffset = 30;
    const fontSize = Math.min(ringWidth, ringHeight) * 0.08;
    
    p.fill(255); 
    p.noStroke();
    p.textSize(fontSize);
    p.textStyle(p.BOLD);
    
    p.textAlign(p.RIGHT, p.CENTER);
    p.text("Finish", topTickX - labelOffset, topTickY - 50);
    
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Start", topTickX + labelOffset, topTickY + 50);

    const swimmerAngle = p.map(timePosition, 0, 60, 0, p.TWO_PI) - p.HALF_PI;
    const swimmerX = cx + (ringWidth / 2) * p.cos(swimmerAngle);
    const swimmerY = cy + (ringHeight / 2) * p.sin(swimmerAngle);

    const swimmerSize = 100;
    p.push();
    p.translate(swimmerX, swimmerY);
    p.rotate(swimmerAngle + p.HALF_PI);
    p.image(swimmerImg, 0, 0, swimmerSize, swimmerSize);
    p.pop();

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
  
});