 //Below code is the configuration for the calories burnt dashboard. It populates the CSS id = "calorieGraph"//

        //var calorieObj = localStorage.getItem('activity');
    function calorie_graph(date,obj){
        var calorieLabels = ["Burnt","Target"];
        var calorieData=[];
        //calorieObj = JSON.parse(calorieObj);
        var activityCalorieGoal=3000;
        var activityCalorieBurnt=obj["calories"][date];
        var activityCalorieRemaining=activityCalorieGoal-activityCalorieBurnt;
        console.log(activityCalorieRemaining);
        calorieData.push(activityCalorieBurnt);
        calorieData.push(Math.max(0,activityCalorieRemaining));
        
        
        

    var calorieConfig = {
        type: 'doughnut',
        data: {
            datasets: [{
                	data: calorieData,
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
            labels: calorieLabels
        },
        options: {
        	cutoutPercentage:70,
            responsive: true,
             title: {
                display: true,
                padding: 4,
                text: 'Calories Burnt',
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

    var calorieCtx = document.getElementById("calorieGraph");
    var calorieChart = new Chart(calorieCtx,calorieConfig);
};

        