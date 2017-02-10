var app = require('./app.js')
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require("request");
var testRouter = express.Router();
testRouter.use(bodyParser.json());
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var testApp = express();
testApp.use(morgan('dev'));

var activitySchema = require('./mongodb/activitySchema');

console.log('test.js');

var token = '';
var authorization = '';
var date = new Date();
//var currentDate = dateFormat(date);
var lastLogInDate='';
var dtArray=[];
var steps='';
var calories='';

token = {"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzdDTkYiLCJhdWQiOiIyMjdXSjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDg1NjgxOTkxLCJpYXQiOjE0ODU2NTMxOTF9.SZvwiP7JskMb3z3ZgKR92GEvd4Hij28_YjPVEDhqV1k","refreshToken":"418a128c242de2eef384fb8d0d6b4c179d238a4ae28a540c4d2718cd368e10d1","profile":{"provider":"fitbit","id":"477CNF","displayName":"Ramjeji C.","_json":{"user":{"age":29,"autoStrideEnabled":true,"avatar":"https://static0.fitbit.com/images/profile/defaultProfile_100_male.gif","avatar150":"https://static0.fitbit.com/images/profile/defaultProfile_150_male.gif","averageDailySteps":18680,"clockTimeDisplayFormat":"12hour","corporate":true,"corporateAdmin":false,"dateOfBirth":"1987-07-11","displayName":"Ramjeji C.","displayNameSetting":"name","distanceUnit":"en_US","encodedId":"477CNF","features":{"exerciseGoal":true},"foodsLocale":"en_US","fullName":"Ramjeji Chukka","gender":"MALE","glucoseUnit":"en_US","height":180,"heightUnit":"en_US","locale":"en_US","memberSince":"2016-01-18","mfaEnabled":false,"offsetFromUTCMillis":-28800000,"startDayOfWeek":"MONDAY","strideLengthRunning":110.60000000000001,"strideLengthRunningType":"manual","strideLengthWalking":74.7,"strideLengthWalkingType":"manual","swimUnit":"en_US","timezone":"America/Los_Angeles","topBadges":[{"badgeGradientEndColor":"A489E8","badgeGradientStartColor":"38216E","badgeType":"DAILY_STEPS","category":"Daily Steps","cheers":[],"dateTime":"2017-01-27","description":"20,000 steps in a day","earnedMessage":"Congrats on earning your first High Tops badge!","encodedId":"228TPP","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps20k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_steps20k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_steps20k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_steps20k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_steps20k.png","marketingDescription":"You've walked 20,000 steps  And earned the High Tops badge!","mobileDescription":"When it comes to steps, it looks like you're not playing around. This achievement was a slam dunk.","name":"High Tops (20,000 steps in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps20k.png","shareText":"I took 20,000 steps and earned the High Tops badge! #Fitbit","shortDescription":"20,000 steps","shortName":"High Tops","timesAchieved":4,"value":20000},{"badgeGradientEndColor":"FFDB01","badgeGradientStartColor":"D99123","badgeType":"LIFETIME_DISTANCE","category":"Lifetime Distance","cheers":[],"dateTime":"2017-01-24","description":"990 lifetime miles","earnedMessage":"Whoa! You've earned the New Zealand badge!","encodedId":"22B8MD","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_miles990.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_miles990.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_miles990.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_miles990.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_miles990.png","marketingDescription":"By reaching 990 lifetime miles, you've earned the New Zealand badge!","mobileDescription":"You've walked the entire length of New Zealand.","name":"New Zealand (990 lifetime miles)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_miles990.png","shareText":"I covered 990 miles with my #Fitbit and earned the New Zealand badge.","shortDescription":"990 miles","shortName":"New Zealand","timesAchieved":1,"unit":"MILES","value":990},{"badgeGradientEndColor":"38D7FF","badgeGradientStartColor":"2DB4D7","badgeType":"DAILY_FLOORS","category":"Daily Climb","cheers":[],"dateTime":"2016-08-22","description":"50 floors in a day","earnedMessage":"Congrats on earning your first Lighthouse badge!","encodedId":"228TT7","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_floors50.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_floors50.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_floors50.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_floors50.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_floors50.png","marketingDescription":"You've climbed 50 floors to earn the Lighthouse badge!","mobileDescription":"With a floor count this high, you're a beacon of inspiration to us all!","name":"Lighthouse (50 floors in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_floors50.png","shareText":"I climbed 50 flights of stairs and earned the Lighthouse badge! #Fitbit","shortDescription":"50 floors","shortName":"Lighthouse","timesAchieved":2,"value":50},{"badgeGradientEndColor":"00D3D6","badgeGradientStartColor":"007273","badgeType":"LIFETIME_FLOORS","category":"Lifetime Climb","cheers":[],"dateTime":"2017-01-24","description":"2,000 lifetime floors","earnedMessage":"Yipee! You've earned the Hot Air Balloon badge!","encodedId":"228T9T","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_floors2k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_floors2k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_floors2k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_floors2k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_floors2k.png","marketingDescription":"By climbing 2000 lifetime floors, you've earned the Hot Air Balloon badge!","mobileDescription":"That's as high as a hot air balloon! You are really blowing up the lifetime badges list.","name":"Hot Air Balloon (2,000 lifetime floors)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_floors2k.png","shareText":"I climbed 2,000 floors with my #Fitbit and earned the Hot Air Balloon badge.","shortDescription":"2,000 floors","shortName":"Hot Air Balloon","timesAchieved":1,"value":2000}],"waterUnit":"METRIC","waterUnitName":"ml","weight":85.7,"weightUnit":"en_US"}}}}
steps = {"activities-steps":[{"dateTime":"2017-01-23","value":"10000"},{"dateTime":"2017-01-24","value":"2000"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-28","value":"13058"},{"dateTime":"2017-01-29","value":"7407"}]}

/*
activityCreate(function(a){
	console.log(a);
})
*/
var obj = '';
function updateObject(callback){
var stepsObj = '';
var stepsString='';
for (i = steps["activities-steps"].length-1 ;i>=0; i--){
	if (i!=0){
		stepsString = stepsString+'\"steps.' + steps["activities-steps"][i]["dateTime"]+'\":'+steps["activities-steps"][i]["value"]+',';
	}
	else{
		stepsString = stepsString+'\"steps.' + steps["activities-steps"][i]["dateTime"]+'\":'+steps["activities-steps"][i]["value"];
	}
}
stepsString = '{\"stepsActivity\":{'+stepsString+'}}';
stepsObj = JSON.parse(stepsString);
callback(stepsObj);
}


function activityUpdate(obj,callback)
{
    activitySchema.findByIdAndUpdate(token.profile.id,{$set:obj.stepsActivity},{new : true},function(err,update){
    	if (err) throw err;
        console.log(update);
  })
};


function activityCreate(callback)
{
  activitySchema.create({_id:token.profile.id,steps:{}},function(err,create){
    if(err) throw err;
    console.log('activity created:'+create);
    callback(step);
})
};


/*testApp.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

module.exports = testRouter;