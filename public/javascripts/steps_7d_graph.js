    var labels = [];
    var data=[];
    console.log('aaaaa');
    function steps_7d_graph(dateArray,stepsObj){
        //apicall_7d_steps(date, function(steps){
        console.log('bbbbb'+steps);


        for (i = dateArray.length - 1; i >= 0 ; i--){
            labels.push(dateArray[i]);
            data.push(stepsObj["steps"][dateArray[i]])
        }

        var horizonalLinePlugin = {
            afterDraw: function(chartInstance) {
                var yScale = chartInstance.scales["y-axis-0"];
                var canvas = chartInstance.chart;
                var ctx = canvas.ctx;
                var index;
                var line;
                var style;

                if (chartInstance.options.horizontalLine) {
                  for (index = 0; index < chartInstance.options.horizontalLine.length; index++) 
                    {
                    line = chartInstance.options.horizontalLine[index];

                    if (!line.style) {
                      style = "rgba(169,169,169, .6)";
                    } 

                    else 
                    {
                      style = line.style;
                    }

                    if (line.y) 
                    {
                      yValue = yScale.getPixelForValue(line.y);
                    } else {
                      yValue = 0;
                    }

                    ctx.lineWidth = 3;

                    if (yValue) {
                      ctx.beginPath();
                      ctx.moveTo(0, yValue);
                      ctx.lineTo(canvas.width, yValue);
                      ctx.strokeStyle = style;
                      ctx.stroke();
                    }

                    if (line.text) {
                      ctx.fillStyle = style;
                      ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
                    }
                  }
                  return;
                };
            }
        };
    Chart.pluginService.register(horizonalLinePlugin);






        var config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets:  [{
                    label: "Steps",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: false,
                    scaleShowVerticalLines: false,
                }] 
            },
            options: {
                legend:{
                    display:false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "#FFFFFF",
                        }
                    }]
                },
            title: {
                display: true,
                padding: 10,
                text: 'STEPS',
                fontSize:15
            },
                "horizontalLine": [{
                            "y": 10000,
                            "style": "rgba(255, 0, 0, .4)"
                    }]
            }};
        
            var ctx = document.getElementById("steps7dGraph").getContext("2d");
            var stepChart = new Chart(ctx, config);

        //};
            
    };

        