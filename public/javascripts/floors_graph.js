 //Below code is the configuration for the floors burnt dashboard. It populates the CSS id = "floorGraph"//

    function floors_graph(date,obj){
        var floorLabels = ["Covered","Target"];
        var floorData=[];
        //floorObj = JSON.parse(floorObj);
        var activityfloorGoal=10;
        if(obj["floors"]){
            var activityfloorCovered=obj["floors"][date];
        }
        else{
            var activityfloorCovered = 0
        }
        var activityfloorRemaining=activityfloorGoal-activityfloorCovered;
        console.log(activityfloorCovered);
        floorData.push(activityfloorCovered);
        floorData.push(Math.max(0,activityfloorRemaining));
        
        
        

    var floorConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                	data: floorData,
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
            labels: floorLabels
        },
        options: {
        	cutoutPercentage:70,
            responsive: true,
             title: {
                display: true,
                padding: 4,
                text: 'Floor',
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



    var floorCtx = document.getElementById("floorsGraph");
    var floorChart = new Chart(floorCtx,floorConfig);
};
        