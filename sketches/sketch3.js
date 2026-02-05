// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let startTime;
  let drops = [];
  let lastDropTime = 0;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    startTime = p.millis();
  };

  p.draw = function () {
    p.background(240);

    const cx = p.width / 2;
    const cy = p.height / 2;

    const elapsedMillis = p.millis() - startTime;
    const elapsedSeconds = elapsedMillis / 1000;
    const remainingSeconds = Math.max(0, 60 - elapsedSeconds);

    const maxSize = Math.min(p.width, p.height) * 0.3;
    const meltProgress = remainingSeconds / 60;
    const cubeSize = maxSize * meltProgress;

    const maxPuddleWidth = maxSize * 2;
    const maxPuddleHeight = maxSize * 0.4;
    const puddleProgress = 1 - meltProgress;
    const puddleWidth = maxPuddleWidth * puddleProgress;
    const puddleHeight = maxPuddleHeight * puddleProgress;
    const puddleY = cy + maxSize * 0.6;

    if (cubeSize > 0 && elapsedSeconds - lastDropTime >= 2) {
      const dropStartY = cy + cubeSize / 2;
      drops.push({
        x: cx,
        y: dropStartY,
        targetY: puddleY
      });
      lastDropTime = elapsedSeconds;
    }

    for (let i = drops.length - 1; i >= 0; i--) {
      let drop = drops[i];
      drop.y += 3;
      
      p.noStroke();
      p.fill(150, 200, 230, 200);
      p.ellipse(drop.x, drop.y, 8, 12);
      
      if (drop.y >= drop.targetY) {
        drops.splice(i, 1);
      }
    }

    //Timer
    p.fill(0);
    p.noStroke();
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.text(Math.ceil(remainingSeconds) + "s", cx, 60);

    if (puddleWidth > 0) {
      p.noStroke();
      p.fill(150, 200, 230, 180);
      p.ellipse(cx, puddleY, puddleWidth, puddleHeight);
    }

    if (cubeSize > 0) {
      p.noStroke();
      p.fill(200, 230, 255);
      p.rect(cx, cy, cubeSize, cubeSize, 10);
      p.fill(230, 245, 255, 150);
      p.rect(cx - cubeSize * 0.15, cy - cubeSize * 0.15, cubeSize * 0.4, cubeSize * 0.4, 5);
    }
  };

  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});
