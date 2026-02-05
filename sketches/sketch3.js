// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let startTime;

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

    p.fill(0);
    p.noStroke();
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.text(Math.ceil(remainingSeconds) + "s", cx, 60);

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
