//var info = document.getElementById("info");
var accessToken='';
var authorization = 'Bearer ';








/*var xhr = new XMLHttpRequest();
xhr.open("GET", "token",true);
console.log('aa');
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 0 || xhr.readyState== 4) {
	    	console.log('cc');
	    	
	    	
	    	//res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\profile.html')
	        var userInfo = xhr.responseText;
	        console.log('happy');
	        console.log(userInfo);
	    }

	};
xhr.send();
*/



var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "/token";

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var userInfo = JSON.parse(xhr.responseText);
            accessToken = userInfo.accessToken;
            authorization = authorization+accessToken;


/*GET request to get number of steps for 7days*/
			var profile = new XMLHttpRequest(),
				method = 'GET',
				url = "https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json";
				profile.open(method, url, true);
				profile.setRequestHeader('Authorization',authorization);
				profile.onreadystatechange = function () {
			        if(profile.readyState === XMLHttpRequest.DONE && profile.status === 200) {
			            var steps = profile.responseText;
			            passSteps(steps);

			    	}
			    };
			profile.send(null);	   
/*End of GET request for 7day steps */  
/*GET request to get current day activity summary*/
			var activities = new XMLHttpRequest(),
				method = 'GET',
				url = "https://api.fitbit.com/1/user/-/activities/date/today.json";
				activities.open(method, url, true);
				activities.setRequestHeader('Authorization',authorization);
				activities.onreadystatechange = function () {
			        if(activities.readyState === XMLHttpRequest.DONE && activities.status === 200) {
			            var activity = activities.responseText;
			            console.log(activity);
			            passactivity(activity);
			    	}
			    };
			activities.send(null);	   
/*End of GET request for current day activitys burnt steps */  

        }
    };
xhr.send(null);


function passSteps(steps){
	localStorage.setItem('steps',steps);
}

function passactivity(activity){
	localStorage.setItem('activity',activity);
}








 


