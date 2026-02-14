registerSketch('sk5', function (p) {
  let insuranceData;
  let processedData = {};
  let regionColors = {
    'southeast': [255, 100, 100],  // red
    'southwest': [100, 150, 255],  // blue
    'northeast': [100, 200, 100],  // green
    'northwest': [255, 180, 100]   // orange
  };
  let hoveredPoint = null;
  let maxPoints = {};

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

  function drawStar(x, y, radius1, radius2, npoints) {
    let angle = p.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p.beginShape();
    for (let a = -p.HALF_PI; a < p.TWO_PI - p.HALF_PI; a += angle) {
      let sx = x + p.cos(a) * radius2;
      let sy = y + p.sin(a) * radius2;
      p.vertex(sx, sy);
      sx = x + p.cos(a + halfAngle) * radius1;
      sy = y + p.sin(a + halfAngle) * radius1;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  }

  p.draw = function () {
    p.background(250);

    const marginLeft = 100;
    const marginRight = 200;
    const marginTop = 80;
    const marginBottom = 100;
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

    minCost = Math.floor(minCost / 5000) * 5000;
    maxCost = Math.ceil(maxCost / 5000) * 5000;

    p.stroke(220);
    p.strokeWeight(1);
    p.fill(100);
    p.textAlign(p.RIGHT, p.CENTER);
    p.textSize(12);
    
    const costStep = 5000;
    for (let cost = minCost; cost <= maxCost; cost += costStep) {
      const y = p.map(cost, minCost, maxCost, p.height - marginBottom, marginTop);
      
      p.stroke(220);
      p.line(marginLeft, y, p.width - marginRight, y);
      
      p.noStroke();
      p.text('$' + (cost / 1000) + 'k', marginLeft - 10, y);
    }

    p.textAlign(p.CENTER, p.TOP);
    const ageStep = 5;
    
    for (let age = Math.ceil(minAge / ageStep) * ageStep; age <= maxAge; age += ageStep) {
      const x = p.map(age, minAge, maxAge, marginLeft, p.width - marginRight);
      
      p.stroke(220);
      p.line(x, marginTop, x, p.height - marginBottom);
      
      p.noStroke();
      p.fill(100);
      p.text(age, x, p.height - marginBottom + 10);
    }

    p.stroke(0);
    p.strokeWeight(2);
    p.line(marginLeft, marginTop, marginLeft, p.height - marginBottom);
    p.line(marginLeft, p.height - marginBottom, p.width - marginRight, p.height - marginBottom);

    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(16);
    p.text("Age (years)", (marginLeft + p.width - marginRight) / 2, p.height - marginBottom + 50);
    
    p.push();
    p.translate(20, (marginTop + p.height - marginBottom) / 2);
    p.rotate(-p.HALF_PI);
    p.textAlign(p.CENTER, p.TOP);
    p.text("Average Insurance Cost", 0, 0);
    p.pop();

    p.textAlign(p.CENTER, p.TOP);
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.text("Medical Insurance Costs Based on Your Region", p.width / 2, 20);
    p.textStyle(p.NORMAL);

    p.textSize(16);
    p.textStyle(p.BOLD);
    p.text("Across regional demographics, average medical insurance costs can vary,", p.width / 2, 55);
    p.text("indicating health economic dependency on regional location.", p.width / 2, 75);
    p.textStyle(p.NORMAL);

    const highlightX1 = p.map(50, minAge, maxAge, marginLeft, p.width - marginRight);
    const highlightX2 = p.map(maxAge, minAge, maxAge, marginLeft, p.width - marginRight);
    const highlightY1 = p.map(35000, minCost, maxCost, p.height - marginBottom, marginTop);
    const highlightY2 = p.map(20000, minCost, maxCost, p.height - marginBottom, marginTop);
    
    p.fill(255, 192, 203, 80);
    p.noStroke();
    p.rect(highlightX1, highlightY1, highlightX2 - highlightX1, highlightY2 - highlightY1);

    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(15);
    p.textStyle(p.ITALIC);

    const annotationText = "Majority of regions peak in insurance costs at older ages, with SE being a single outlier, peaking at 19.";
    const boxWidth = highlightX2 - highlightX1 - 10;

    const words = annotationText.split(' ');
    let line = '';
    let yOffset = highlightY1 + 5;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const testWidth = p.textWidth(testLine);
  
      if (testWidth > boxWidth && line.length > 0) {
        p.text(line, highlightX1 + 5, yOffset);
        line = words[i] + ' ';
        yOffset += 14;
     } else {
        line = testLine;
      }
    }
    p.text(line, highlightX1 + 5, yOffset); 

    p.textStyle(p.NORMAL);

    hoveredPoint = null;
    maxPoints = {};
    const hoverRadius = 10;

    regions.forEach(region => {
      const ages = Object.keys(processedData[region]).map(Number);
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
      
      maxPoints[region] = {
        age: maxAgeForRegion,
        cost: maxCostForRegion,
        x: maxX,
        y: maxY
      };
    });

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
        
        const distance = p.dist(p.mouseX, p.mouseY, x, y);
        if (distance < hoverRadius) {
          hoveredPoint = {
            age: age,
            cost: cost,
            region: region,
            x: x,
            y: y,
            color: color,
            isMax: (age === maxPoints[region].age)
          };
        }
      });
      p.endShape();
    });

    // Draw yellow stars at max points
    regions.forEach(region => {
      const maxPt = maxPoints[region];
      
      p.fill(255, 215, 0); // yellow/gold
      p.stroke(200, 170, 0); // darker yellow outline
      p.strokeWeight(2);
      drawStar(maxPt.x, maxPt.y, 6, 12, 5);
    });

    const seMaxPt = maxPoints['southeast'];
    if (seMaxPt) {
      p.stroke(0);
      p.strokeWeight(1);
      p.line(seMaxPt.x, seMaxPt.y, seMaxPt.x + 40, seMaxPt.y - 30);
      p.fill(0);
      p.noStroke();
      p.textAlign(p.LEFT, p.BOTTOM);
      p.textSize(14);
      p.textStyle(p.ITALIC);
      p.text("SE has the highest", seMaxPt.x + 45, seMaxPt.y - 30);
      p.text("insurance cost", seMaxPt.x + 45, seMaxPt.y - 17);
      p.textStyle(p.NORMAL);
}

    if (hoveredPoint) {
      const tooltipX = hoveredPoint.x;
      const tooltipY = hoveredPoint.y - 60;
      const tooltipWidth = 150;
      const tooltipHeight = 50;
      
      // Tooltip box
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(1);
      p.rect(tooltipX - tooltipWidth / 2, tooltipY, tooltipWidth, tooltipHeight, 5);
      
      p.fill(0);
      p.noStroke();
      p.textAlign(p.CENTER, p.TOP);
      p.textSize(12);
      p.textStyle(p.BOLD);
      
      const regionLabels = {
        'southeast': 'Southeast',
        'southwest': 'Southwest',
        'northeast': 'Northeast',
        'northwest': 'Northwest'
      };
      
      p.text(regionLabels[hoveredPoint.region], tooltipX, tooltipY + 5);
      p.textStyle(p.NORMAL);
      p.text(`Age: ${hoveredPoint.age}`, tooltipX, tooltipY + 20);
      p.text(`Cost: $${Math.round(hoveredPoint.cost).toLocaleString()}`, tooltipX, tooltipY + 35);

      if (!hoveredPoint.isMax) {
        p.fill(hoveredPoint.color[0], hoveredPoint.color[1], hoveredPoint.color[2]);
        p.noStroke();
        p.ellipse(hoveredPoint.x, hoveredPoint.y, 10, 10);
      }
    }

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