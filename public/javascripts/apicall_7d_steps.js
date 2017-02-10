var steps=null;

function apicall_7d_steps(callback){
var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "/activityCenter/steps7d";
xhr.open(method, url, true);
xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            steps = JSON.parse(xhr.responseText);
            callback(steps);
        }
    };
xhr.send(null);

}