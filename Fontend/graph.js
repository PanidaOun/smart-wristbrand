var dps = [{y: 0}];

var updateChart = function () {

    fetch("http://158.108.182.16:50014/information", {method: "GET"})
        .then((data) => data.json())
        .then((datas) => {
            var value = datas[Object.keys(datas)];
            var array_num = Object.keys(value);
            var info = value[array_num];
            var cal = info.calories;

            dps.push({
                y: cal
            });

        })
        .catch((error) => console.log("error", error));
        
    chart.render();
};

var chart = new CanvasJS.Chart("cal-graph", {
    animationEnabled: true,
    title:{
      text: "Graph of calories burned VS movement",
      fontFamily: 'Karla'
    },
    data: [{        
      type: "line",
          indexLabelFontSize: 16,
      dataPoints:
        dps
    }]
});
chart.render();

setInterval(function(){updateChart()}, 60000);