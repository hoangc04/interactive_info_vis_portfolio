registerSketch('sk5', function (p) {
  let insuranceData;
  let processedData = {};

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
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.text("Data loaded! Check console.", p.width / 2, p.height / 2);
  };

  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});