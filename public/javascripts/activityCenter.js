var accessToken='';
var today = new Date();
var dateCounter = new Date();
var forwardButton=null;
var backwardButton=null;
var activitySummaryHeader=null;
var steps=null;
var activity=null;



//dateString retuns the date as a string//
 function dateString(date){
	var a = date.toDateString();
	return(a)
}

//incrementDate function increments date by 1 day//
function incrementDate(date){
	date.setDate(date.getDate() + 1);
	return(date)
}

//decrementDate function decrements date by 1 day//
function decrementDate(date){
	date.setDate(date.getDate() - 1);
	return(date)
	
}

//datediff function calculates the difference in days between two dates//
function dateDiff(date1,date2){
	var timeDiff = (date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return(diffDays);
}

function dateFormat(date){
	var yyyy = date.getFullYear().toString();
  	var mm = (date.getMonth()+1).toString();
  	var dd  = date.getDate().toString();
  	if (mm.length == 1){
  		mm = '0'+mm;
  	}
    if (dd.length == 1){
      dd = '0'+dd;
    }
  	return(yyyy+'-'+mm+'-'+dd);
}


stepsCall();
activitySummaryCall(dateFormat(today));

window.onload = function () {
    forwardButton = document.getElementById("forwardButton");
    backwardButton = document.getElementById("backwardButton");
    activitySummaryHeader = document.getElementById("activitySummaryHeader");
    forwardButton.style.display='none';

//onclick backward button function//
    backwardButton.addEventListener("click", function() {
    	if(dateDiff(decrementDate(dateCounter),today)<=6){
    			activitySummaryHeader.innerHTML = dateString(dateCounter);
				forwardButton.style.display='initial';
				activitySummaryCall(dateFormat(dateCounter));
    	}
    	else{
    		incrementDate(dateCounter);
    		alert("Cannot return data older than 7 days")
    	}
	
	});
//End of onclick backward button function//
//onclick forward button function//
    forwardButton.addEventListener("click",function(){
    	if(dateDiff(incrementDate(dateCounter),today)>=0){
    		activitySummaryHeader.innerHTML = dateString(dateCounter);
    		activitySummaryCall(dateFormat(dateCounter));
    	}
    	else{
    		decrementDate(dateCounter);
    		alert("Do not have tomorrow's data")
    	}
    });
 //End of onclick forward button function//
};

///////////////////////////////////////////
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("leaderBoard");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
///////////////////////////////////////////////////

function dateArray(date,range){
  var dateArray = [];
  dateArray.push(dateFormat(date));
  for (i = 0 ; i < range-1; i ++){
    dateArray.push(dateFormat(decrementDate(date)))
  }
  return dateArray;
}


function stepsCall(){
	apicall_7d_steps(function(stepsObj){
  //console.log(stepsObj)
  steps_7d_graph(dateArray(new Date,7),stepsObj);
});
};

function activitySummaryCall(date){
apicall_activity_summary(date,function(activity){
  //console.log('activity object'+(activity));
	calorie_graph(date,activity);
	distance_graph(date,activity);
	floors_graph(date,activity);
	steps_graph(date,activity);
});
};








 




 


