 //Below code is the configuration for the distances burnt dashboard. It populates the CSS id = "distanceGraph"//

    function distance_graph(date,obj){
        var distanceLabels = ["Covered","Target"];
        var distanceData=[];
        //distanceObj = JSON.parse(distanceObj);
        var activitydistanceGoal=10;
        var activitydistanceCovered=obj["distance"][date];
        var activitydistanceRemaining=activitydistanceGoal-activitydistanceCovered;
        console.log(activitydistanceRemaining);
        distanceData.push(activitydistanceCovered.toFixed(2));
        distanceData.push(Math.max(0,activitydistanceRemaining.toFixed(2)));
        
        
        

    var distanceConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                	data: distanceData,
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
            labels: distanceLabels
        },
        options: {
        	cutoutPercentage:70,
            responsive: true,
             title: {
                display: true,
                padding: 4,
                text: 'Distance',
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



    var distanceCtx = document.getElementById("distanceGraph");
    var distanceChart = new Chart(distanceCtx,distanceConfig);
};