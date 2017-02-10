var activity = null;


function apicall_activity_summary(date,callback){
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "/activityCenter/activity/"+date;
xhr.open(method, url, true);
xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
             activity = JSON.parse(xhr.responseText);
             callback(activity);

        }
    };
xhr.send(null);

}