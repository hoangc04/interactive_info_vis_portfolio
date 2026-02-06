// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(200, 220, 240);

    const cx = p.width / 2;
    const cy = p.height / 2;
    const trackWidth = p.width * 0.8;
    const trackHeight = 20;
    const trackY = cy + 50; 

    p.fill(80, 70, 60);
    p.noStroke();
    p.rect(p.width * 0.1, trackY, trackWidth, trackHeight);

    p.fill(120, 100, 80); 
    const tieWidth = 10;
    const tieHeight = trackHeight * 2;
    const tieSpacing = 40;
    
    for (let x = p.width * 0.1; x < p.width * 0.9; x += tieSpacing) {
      p.rect(x, trackY - tieHeight / 4, tieWidth, tieHeight);
    }

    p.fill(150, 50, 50); 
    p.rect(station1X - 25, stationY, 50, 60);
    p.rect(station2X - 25, stationY, 50, 60);

    // Station labels
    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.text("Station 1", station1X, stationY - 10);
    p.text("Final Station", station2X, stationY - 10);

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
