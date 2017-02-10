 //Below code is the configuration for the steps burnt dashboard. It populates the CSS id = "stepGraph"//

    function steps_graph(date,obj){
        var stepLabels = ["Taken","Target"];
        var stepData=[];
        //stepObj = JSON.parse(stepObj);
        //console.log(stepObj)
        var activitystepGoal=10000;
        var activitystepCovered=obj["steps"][date];
        var activitystepRemaining=activitystepGoal-activitystepCovered;
        console.log(activitystepCovered);
        stepData.push(activitystepCovered);
        stepData.push(Math.max(0,activitystepRemaining));
        
        
        

    var stepConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                	data: stepData,
                    backgroundColor: ["rgba(75,192,192,0.4)","rgba(255, 0, 0, .4)"],
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
                    pointHitRadius: 10
            }],
            labels: stepLabels
        },
        options: {
        	cutoutPercentage:70,
            responsive: true,
             title: {
                display: true,
                padding: 4,
                text: 'Steps',
                fontSize:15
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            legend:{
                display: false
            }

        }
    };



    var stepCtx = document.getElementById("stepsGraph");
    var stepChart = new Chart(stepCtx,stepConfig);
};
        