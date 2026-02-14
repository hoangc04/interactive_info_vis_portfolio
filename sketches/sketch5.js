registerSketch('sk5', function (p) {
  let insuranceData;
  let processedData = {};
  let regionColors = {
    'southeast': [255, 100, 100],  // red
    'southwest': [100, 150, 255],  // blue
    'northeast': [100, 200, 100],  // green
    'northwest': [255, 180, 100]   // orange
  };

  p.preload = function () {
    insuranceData = p.loadTable('insurance.csv', 'csv', 'header');
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    processData();
    console.log("Processed Data:", processedData);
  };

  function processData() {
    const regions = ['southeast', 'southwest', 'northeast', 'northwest'];
    
    regions.forEach(region => {
      processedData[region] = {};
    });

    for (let i = 0; i < insuranceData.getRowCount(); i++) {
      const age = insuranceData.getNum(i, 'age');
      const charges = insuranceData.getNum(i, 'charges');
      const region = insuranceData.getString(i, 'region');

      if (!processedData[region][age]) {
        processedData[region][age] = {
          total: 0,
          count: 0
        };
      }

      processedData[region][age].total += charges;
      processedData[region][age].count += 1;
    }

    regions.forEach(region => {
      for (let age in processedData[region]) {
        const data = processedData[region][age];
        processedData[region][age] = data.total / data.count;
      }
    });
  }

  p.draw = function () {
    p.background(250);

    const marginLeft = 80;
    const marginRight = 200;
    const marginTop = 80;
    const marginBottom = 80;
    const chartWidth = p.width - marginLeft - marginRight;
    const chartHeight = p.height - marginTop - marginBottom;

    let minAge = Infinity;
    let maxAge = -Infinity;
    let minCost = Infinity;
    let maxCost = -Infinity;

    const regions = ['southeast', 'southwest', 'northeast', 'northwest'];
    
    regions.forEach(region => {
      const ages = Object.keys(processedData[region]).map(Number);
      const costs = Object.values(processedData[region]);
      
      minAge = Math.min(minAge, ...ages);
      maxAge = Math.max(maxAge, ...ages);
      minCost = Math.min(minCost, ...costs);
      maxCost = Math.max(maxCost, ...costs);
    });

    p.stroke(0);
    p.strokeWeight(2);
    p.line(marginLeft, marginTop, marginLeft, p.height - marginBottom); // y-axis
    p.line(marginLeft, p.height - marginBottom, p.width - marginRight, p.height - marginBottom); // x-axis

    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(16);
    p.text("Age", (marginLeft + p.width - marginRight) / 2, p.height - marginBottom + 40);
    
    p.push();
    p.translate(20, (marginTop + p.height - marginBottom) / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER, p.TOP);
    p.text("Average Insurance Cost ($)", 0, 0);
    p.pop();

    p.textAlign(p.CENTER, p.TOP);
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.text("Average Insurance Cost by Age and Region", p.width / 2, 20);
    p.textStyle(p.NORMAL);

    regions.forEach(region => {
      const ages = Object.keys(processedData[region]).map(Number).sort((a, b) => a - b);
      const color = regionColors[region];
      
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(3);
      p.noFill();
      
      p.beginShape();
      ages.forEach(age => {
        const cost = processedData[region][age];
        const x = p.map(age, minAge, maxAge, marginLeft, p.width - marginRight);
        const y = p.map(cost, minCost, maxCost, p.height - marginBottom, marginTop);
        p.vertex(x, y);
      });
      p.endShape();

      let maxCostForRegion = -Infinity;
      let maxAgeForRegion = 0;
      
      ages.forEach(age => {
        const cost = processedData[region][age];
        if (cost > maxCostForRegion) {
          maxCostForRegion = cost;
          maxAgeForRegion = age;
        }
      });

      const maxX = p.map(maxAgeForRegion, minAge, maxAge, marginLeft, p.width - marginRight);
      const maxY = p.map(maxCostForRegion, minCost, maxCost, p.height - marginBottom, marginTop);
      
      p.fill(color[0], color[1], color[2]);
      p.noStroke();
      p.ellipse(maxX, maxY, 12, 12);
      p.fill(0);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(`Age ${maxAgeForRegion}: $${Math.round(maxCostForRegion)}`, maxX + 10, maxY);
    });

    const legendX = p.width - marginRight + 20;
    let legendY = marginTop;
    
    p.fill(0);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT, p.TOP);
    p.text("Region", legendX, legendY);
    p.textStyle(p.NORMAL);
    
    legendY += 30;
    
    const regionLabels = {
      'southeast': 'Southeast',
      'southwest': 'Southwest',
      'northeast': 'Northeast',
      'northwest': 'Northwest'
    };
    
    regions.forEach(region => {
      const color = regionColors[region];
      
      p.fill(color[0], color[1], color[2]);
      p.noStroke();
      p.rect(legendX, legendY, 20, 20);
      p.fill(0);
      p.textSize(14);
      p.textAlign(p.LEFT, p.TOP);
      p.text(regionLabels[region], legendX + 30, legendY + 2);
      
      legendY += 35;
    });
  };

  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});