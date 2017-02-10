var app = require('../app.js')
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require("request");
var acRouter = express.Router();
acRouter.use(bodyParser.json());
var mongoose = require('mongoose');
var hostname = 'localhost';
var port = 3000;
var acApp = express();
acApp.use(morgan('dev'));


var profileSchema = require('../mongodb/profileSchema');
var stepsSchema = require('../mongodb/stepsSchema');
var caloriesSchema = require('../mongodb/caloriesSchema');


var token = '';
var authorization = '';
var date = new Date();
var currentDate = dateFormat(date);
var lastLogInDate='';
var dtArray=[];
var steps='';
var calories='';



function dateFormat(date){
  var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    if (mm.length == 1){
      mm = '0'+mm;
    }
    return(yyyy+'-'+mm+'-'+dd);
}

function incrementDate(date){
  date.setDate(date.getDate() + 1);
  return(date)
}

function decrementDate(date){
  date.setDate(date.getDate() - 6);
  return(date)
}

function stringToDate(str){
  var yyyy = str.substring(0,4);
  var mm = str.substring(5,7)-1;
  var dd = str.substring(8,10);
  return (new Date(yyyy,mm,dd));
}

function dateArray(fromDate,toDate){
  var fromDate = stringToDate(fromDate);
  var days =  Math.round(Math.abs(toDate-fromDate)/(1000*60*60*24));
  var dtArray = [dateFormat(fromDate)];
  for (var i = 0; i < days-1; i++){
    var a = incrementDate(fromDate);
    dtArray.push(dateFormat(a))
  }
console.log(dtArray);

}
token = {"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzdDTkYiLCJhdWQiOiIyMjdXSjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDg1NjgxOTkxLCJpYXQiOjE0ODU2NTMxOTF9.SZvwiP7JskMb3z3ZgKR92GEvd4Hij28_YjPVEDhqV1k","refreshToken":"418a128c242de2eef384fb8d0d6b4c179d238a4ae28a540c4d2718cd368e10d1","profile":{"provider":"fitbit","id":"477CNF","displayName":"Ramjeji C.","_json":{"user":{"age":29,"autoStrideEnabled":true,"avatar":"https://static0.fitbit.com/images/profile/defaultProfile_100_male.gif","avatar150":"https://static0.fitbit.com/images/profile/defaultProfile_150_male.gif","averageDailySteps":18680,"clockTimeDisplayFormat":"12hour","corporate":true,"corporateAdmin":false,"dateOfBirth":"1987-07-11","displayName":"Ramjeji C.","displayNameSetting":"name","distanceUnit":"en_US","encodedId":"477CNF","features":{"exerciseGoal":true},"foodsLocale":"en_US","fullName":"Ramjeji Chukka","gender":"MALE","glucoseUnit":"en_US","height":180,"heightUnit":"en_US","locale":"en_US","memberSince":"2016-01-18","mfaEnabled":false,"offsetFromUTCMillis":-28800000,"startDayOfWeek":"MONDAY","strideLengthRunning":110.60000000000001,"strideLengthRunningType":"manual","strideLengthWalking":74.7,"strideLengthWalkingType":"manual","swimUnit":"en_US","timezone":"America/Los_Angeles","topBadges":[{"badgeGradientEndColor":"A489E8","badgeGradientStartColor":"38216E","badgeType":"DAILY_STEPS","category":"Daily Steps","cheers":[],"dateTime":"2017-01-27","description":"20,000 steps in a day","earnedMessage":"Congrats on earning your first High Tops badge!","encodedId":"228TPP","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps20k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_steps20k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_steps20k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_steps20k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_steps20k.png","marketingDescription":"You've walked 20,000 steps  And earned the High Tops badge!","mobileDescription":"When it comes to steps, it looks like you're not playing around. This achievement was a slam dunk.","name":"High Tops (20,000 steps in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps20k.png","shareText":"I took 20,000 steps and earned the High Tops badge! #Fitbit","shortDescription":"20,000 steps","shortName":"High Tops","timesAchieved":4,"value":20000},{"badgeGradientEndColor":"FFDB01","badgeGradientStartColor":"D99123","badgeType":"LIFETIME_DISTANCE","category":"Lifetime Distance","cheers":[],"dateTime":"2017-01-24","description":"990 lifetime miles","earnedMessage":"Whoa! You've earned the New Zealand badge!","encodedId":"22B8MD","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_miles990.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_miles990.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_miles990.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_miles990.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_miles990.png","marketingDescription":"By reaching 990 lifetime miles, you've earned the New Zealand badge!","mobileDescription":"You've walked the entire length of New Zealand.","name":"New Zealand (990 lifetime miles)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_miles990.png","shareText":"I covered 990 miles with my #Fitbit and earned the New Zealand badge.","shortDescription":"990 miles","shortName":"New Zealand","timesAchieved":1,"unit":"MILES","value":990},{"badgeGradientEndColor":"38D7FF","badgeGradientStartColor":"2DB4D7","badgeType":"DAILY_FLOORS","category":"Daily Climb","cheers":[],"dateTime":"2016-08-22","description":"50 floors in a day","earnedMessage":"Congrats on earning your first Lighthouse badge!","encodedId":"228TT7","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_floors50.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_floors50.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_floors50.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_floors50.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_floors50.png","marketingDescription":"You've climbed 50 floors to earn the Lighthouse badge!","mobileDescription":"With a floor count this high, you're a beacon of inspiration to us all!","name":"Lighthouse (50 floors in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_floors50.png","shareText":"I climbed 50 flights of stairs and earned the Lighthouse badge! #Fitbit","shortDescription":"50 floors","shortName":"Lighthouse","timesAchieved":2,"value":50},{"badgeGradientEndColor":"00D3D6","badgeGradientStartColor":"007273","badgeType":"LIFETIME_FLOORS","category":"Lifetime Climb","cheers":[],"dateTime":"2017-01-24","description":"2,000 lifetime floors","earnedMessage":"Yipee! You've earned the Hot Air Balloon badge!","encodedId":"228T9T","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_floors2k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_floors2k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_floors2k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_floors2k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_floors2k.png","marketingDescription":"By climbing 2000 lifetime floors, you've earned the Hot Air Balloon badge!","mobileDescription":"That's as high as a hot air balloon! You are really blowing up the lifetime badges list.","name":"Hot Air Balloon (2,000 lifetime floors)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_floors2k.png","shareText":"I climbed 2,000 floors with my #Fitbit and earned the Hot Air Balloon badge.","shortDescription":"2,000 floors","shortName":"Hot Air Balloon","timesAchieved":1,"value":2000}],"waterUnit":"METRIC","waterUnitName":"ml","weight":85.7,"weightUnit":"en_US"}}}}
steps = {"activities-steps":[{"dateTime":"2017-01-23","value":"15632"},{"dateTime":"2017-01-24","value":"19652"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-28","value":"13058"},{"dateTime":"2017-01-29","value":"7407"}]}


/*
//renders the activity center html page//
acRouter.get('/',function(req,res){
  //token = app.token();
  authorization = 'Bearer '+token.accessToken;
  

//Insert profile data into member_profiles collection if user does not exist
//else update logInDate to today's date

profileSchema.findByIdAndUpdate({"_id":token.profile.id},{$set:{log:{logInDate: currentDate}}},function(err,profileID)
  {
    if(err) throw err;
    if(profileID==null)
      {
        lastLogInDate = dateFormat(decrementDate(date));
        profileInsert(function(profile)
          {
            console.log('profile created'+ profile);
            apiStepsCall(function(step)
            {  
              console.log('steps object returned:'+step);  
              stepsCreate(function(step)
                {
                  console.log('steps inserted into db:'+step);
                })
            })
            
            apiCaloriesCall(function(calorie)
            {
              console.log('calories object returned:'+calorie);
              caloriesCreate(function(calorie)
              {
                console.log('calories inserted:'+ calorie);
              })
            })
          })
    }
    else{
      lastLogInDate = profileID.log.logInDate;
      apiStepsCall(function(step)
      { 
        console.log('steps object returned:'+step);
        jsonObj(function(step)
        {
          console.log('modified object'+step);
          stepsPull(step,function(step)
          {
            console.log('steps removed:'+step);
            stepsPush(steps,function(step)
            {
              console.log('steps added:'+JSON.parse(step))
            })
          })
          caloriesPull(step,function(calorie)
          {
            console.log('calories removed');
            apiCaloriesCall(function(calorie)
            {
              console.log('calories object returned');
              caloriesPush(calories,function(calorie){
                console.log('caloreis added');
              })
            })
          })
        })
      })
    }
  })



//End of GET request
  res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\index.html');
  //res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\activityCenter.html');
  });

*/

// profileInsert function inserts profile into db.member_profiles colleciton
  function profileInsert(callback)
  {
    profileSchema.create
    ({
        _id:token.profile.id,
        provider : token.profile.provider,
        displayName : token.profile.displayName,
        age : token.profile._json.user.age,
        country : token.profile._json.user.locale,
        dateOfBirth : token.profile._json.user.dateOfBirth,
        displayName : token.profile._json.user.displayName,
        distanceUnit : token.profile._json.user.distanceUnit,
        fullName : token.profile._json.user.fullName,
        gender : token.profile._json.user.gender,
        glucoseUnit :token.profile._json.user.glucoseUnit,
        height :token.profile._json.user.height,
        heightUnit :token.profile._json.user.heightUnit,
        locale : token.profile._json.user.locale,
        memberSince : token.profile._json.user.memberSince,
        offsetFromUTCMillis : token.profile._json.user.offsetFromUTCMillis,
        startDayOfWeek : token.profile._json.user.startDayOfWeek,
        strideLengthRunning : token.profile._json.user.strideLengthRunning,
        strideLengthWalking : token.profile._json.user.strideLengthWalking,
        swimUnit : token.profile._json.user.swimUnit,
        timezone : token.profile._json.user.timezone,
        waterUnit : token.profile._json.user.waterUnit,
        waterUnitName : token.profile._json.user.waterUnitName,
        weight : token.profile._json.user.weight,
        weightUnit : token.profile._json.user.weightUnit,
        log:{logInDate: currentDate}},function(err,profile){
          if (err) throw err;
          callback(profile);
    });
  };
// End

//Steps Section
function apiStepsCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/steps/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      steps = JSON.parse(body);
      //console.log(steps);
      callback(steps);
    });
  }


//function stepsCreate creates a steps document for the given profile.id
function stepsCreate(callback)
{
  /*stepsSchema.collection.insert({_id:token.profile.id, 'createDate': new Date(),'updateDate':new Date(),
    'activities-steps':steps["activities-steps"]},function(err,step)
  {
    if(err) throw err;
    callback(step);
  });*/
  stepsSchema.create({_id:token.profile.id},function(err,step){
    if(err) throw err;
    stepsSchema.findById(token.profile.id,function(err,step){
      console.log(step);
      for (i = steps["activities-steps"].length-1; i >=0; i--){
          step.activity.push(steps["activities-steps"][i]);
        }
      step.save(function(err,dish){
        if(err) throw err;
        callback(dish);
      })
    })
  })
};


function stepsPull(obj,callback){
  stepsSchema.collection.update({_id:token.profile.id},{$pull:{'activities-steps':{$or:obj["activities"]}}},
    {$set:{'updateDate': new Date()}},function(err,step){
      if (err) throw err;
      callback(step);
    })
};

function stepsPush(obj,callback){
  stepsSchema.collection.update({_id:token.profile.id},{$push:{'activities-steps':{$each:obj["activities-steps"]}}},
    {$set:{'updateDate': new Date()}},function(err,step){
      if (err) throw err;
      callback(step);
    })
};
//End Steps section

function jsonPushObj(obj,callback){
  var tt = '';
  for (i = obj["activities-steps"].length-1; i >=0; i--){
    if (i==0){
      tt = tt + JSON.stringify(obj["activities-steps"][i]);
    }
    else{
      tt = tt + JSON.stringify(obj["activities-steps"][i])+',';
    }
  }
  
    callback(tt);
}

function jsonPullObj(callback){
  for (i = 0; i < steps["activities-steps"].length; i++){
      var a = "{\"dateTime\":\""+steps["activities-steps"][i]["dateTime"]+"\"}";
      dtArray.push(a);
  }
  var zz = "{\"activities\":["+dtArray+"]}";
  //console.log(zz)
  zz = JSON.parse(zz);
  callback(JSON.stringify(zz))
};

//Calories section
function apiCaloriesCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/calories/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      calories = JSON.parse(body);
      //console.log(calories);
      callback(calories);
    });
  }

//function caloriesCreate creates a calories document for the given profile.id
function caloriesCreate(callback)
{
  caloriesSchema.collection.insert({_id:token.profile.id, 'createDate': new Date(),'updateDate':new Date(),
    'activities-calories':calories["activities-calories"]},function(err,calorie)
  {
    if(err) throw err;
    callback(calorie);
  });
};


function caloriesPull(obj,callback){
  caloriesSchema.collection.update({_id:token.profile.id},{$pull:{'activities-calories':{$or:obj["activities"]}}},
    {$set:{'updateDate': new Date()}},function(err,calorie){
      if (err) throw err;
      callback(calorie);
    })
};

function caloriesPush(obj,callback){
  caloriesSchema.collection.update({_id:token.profile.id},{$push:{'activities-calories':{$each:obj["activities-calories"]}}},
    {$set:{'updateDate': new Date()}},function(err,calorie){
      if (err) throw err;
      callback(calorie);
    })
};
//End calories section

acApp.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = acRouter;
