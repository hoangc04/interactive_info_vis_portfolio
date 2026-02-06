// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  let startTime;
  let stationImg;

  p.preload = function () {
    stationImg = p.loadImage(`images/train-station.png`);
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(p.CENTER, p.CENTER);
    p.imageMode(p.CENTER);
    startTime = p.millis();
  };
  p.draw = function () {
    p.background(200, 220, 240);

    const cx = p.width / 2;
    const cy = p.height / 2;

    const elapsedMillis = p.millis() - startTime;
    const elapsedSeconds = elapsedMillis / 1000;
    const totalDuration = 7 * 60;
    const remainingSeconds = Math.max(0, totalDuration - elapsedSeconds);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);
    const timeDisplay = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    p.fill(0);
    p.textSize(48);
    p.textStyle(p.BOLD);
    p.text(timeDisplay, cx, 60);

    let phase = "";
    if (elapsedSeconds < 180) {
      phase = "Travel to Station 1";
    } else if (elapsedSeconds < 240) {
      phase = "Break at Station 1";
    } else if (elapsedSeconds < 420) {
      phase = "Travel to Station 2";
    } else {
      phase = "Arrived at Station 2";
    }

    p.textSize(24);
    p.textStyle(p.NORMAL);
    p.text(phase, cx, 110);

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

    const station1X = cx;
    const station2X = p.width * 0.9 - 50;
    const stationY = trackY - 30;
    const stationSize = 100;

    p.image(stationImg, station1X, stationY, stationSize, stationSize);
    p.image(stationImg, station2X, stationY, stationSize, stationSize);

    p.fill(0);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.text("Station 1", station1X, stationY - 10);
    p.text("Final Station", station2X, stationY - 10);

  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
