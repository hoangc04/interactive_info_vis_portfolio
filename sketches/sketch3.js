// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER)
  };
  p.draw = function () {
    // Ice cube
    p.background(240);
    p.fill(200, 230, 255);
    p.rect(cx, cy, cubeSize, cubeSize, 10);
    p.fill(230, 245, 255, 150);
    p.rect(cx - cubeSize * 0.15, cy - cubeSize * 0.15, cubeSize * 0.4, cubeSize * 0.4, 5);

  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
