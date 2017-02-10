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
var activitySchema = require('../mongodb/activitySchema');


var token = '';
var authorization = '';
var date = new Date();
var currentDate = dateFormat(date);
var lastLogInDate='';
var dtArray=[];
var steps='';
var calories='';
var distance = '';
var floors='';



function dateFormat(date){
  var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    if (mm.length == 1){
      mm = '0'+mm;
    }
    if(dd.length == 1){
      dd = '0'+dd;
    }
    return(yyyy+'-'+mm+'-'+dd);
}

function incrementDate(date){
  date.setDate(date.getDate() + 1);
  return(date)
}

function decrementDate(date,range){
  date.setDate(date.getDate() - range);
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
}

/*
token = {"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzdDTkYiLCJhdWQiOiIyMjdXSjMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDg1NjgxOTkxLCJpYXQiOjE0ODU2NTMxOTF9.SZvwiP7JskMb3z3ZgKR92GEvd4Hij28_YjPVEDhqV1k","refreshToken":"418a128c242de2eef384fb8d0d6b4c179d238a4ae28a540c4d2718cd368e10d1","profile":{"provider":"fitbit","id":"477CNF","displayName":"Ramjeji C.","_json":{"user":{"age":29,"autoStrideEnabled":true,"avatar":"https://static0.fitbit.com/images/profile/defaultProfile_100_male.gif","avatar150":"https://static0.fitbit.com/images/profile/defaultProfile_150_male.gif","averageDailySteps":18680,"clockTimeDisplayFormat":"12hour","corporate":true,"corporateAdmin":false,"dateOfBirth":"1987-07-11","displayName":"Ramjeji C.","displayNameSetting":"name","distanceUnit":"en_US","encodedId":"477CNF","features":{"exerciseGoal":true},"foodsLocale":"en_US","fullName":"Ramjeji Chukka","gender":"MALE","glucoseUnit":"en_US","height":180,"heightUnit":"en_US","locale":"en_US","memberSince":"2016-01-18","mfaEnabled":false,"offsetFromUTCMillis":-28800000,"startDayOfWeek":"MONDAY","strideLengthRunning":110.60000000000001,"strideLengthRunningType":"manual","strideLengthWalking":74.7,"strideLengthWalkingType":"manual","swimUnit":"en_US","timezone":"America/Los_Angeles","topBadges":[{"badgeGradientEndColor":"A489E8","badgeGradientStartColor":"38216E","badgeType":"DAILY_STEPS","category":"Daily Steps","cheers":[],"dateTime":"2017-01-27","description":"20,000 steps in a day","earnedMessage":"Congrats on earning your first High Tops badge!","encodedId":"228TPP","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps20k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_steps20k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_steps20k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_steps20k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_steps20k.png","marketingDescription":"You've walked 20,000 steps  And earned the High Tops badge!","mobileDescription":"When it comes to steps, it looks like you're not playing around. This achievement was a slam dunk.","name":"High Tops (20,000 steps in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps20k.png","shareText":"I took 20,000 steps and earned the High Tops badge! #Fitbit","shortDescription":"20,000 steps","shortName":"High Tops","timesAchieved":4,"value":20000},{"badgeGradientEndColor":"FFDB01","badgeGradientStartColor":"D99123","badgeType":"LIFETIME_DISTANCE","category":"Lifetime Distance","cheers":[],"dateTime":"2017-01-24","description":"990 lifetime miles","earnedMessage":"Whoa! You've earned the New Zealand badge!","encodedId":"22B8MD","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_miles990.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_miles990.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_miles990.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_miles990.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_miles990.png","marketingDescription":"By reaching 990 lifetime miles, you've earned the New Zealand badge!","mobileDescription":"You've walked the entire length of New Zealand.","name":"New Zealand (990 lifetime miles)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_miles990.png","shareText":"I covered 990 miles with my #Fitbit and earned the New Zealand badge.","shortDescription":"990 miles","shortName":"New Zealand","timesAchieved":1,"unit":"MILES","value":990},{"badgeGradientEndColor":"38D7FF","badgeGradientStartColor":"2DB4D7","badgeType":"DAILY_FLOORS","category":"Daily Climb","cheers":[],"dateTime":"2016-08-22","description":"50 floors in a day","earnedMessage":"Congrats on earning your first Lighthouse badge!","encodedId":"228TT7","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_daily_floors50.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_daily_floors50.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_daily_floors50.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_daily_floors50.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_daily_floors50.png","marketingDescription":"You've climbed 50 floors to earn the Lighthouse badge!","mobileDescription":"With a floor count this high, you're a beacon of inspiration to us all!","name":"Lighthouse (50 floors in a day)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_floors50.png","shareText":"I climbed 50 flights of stairs and earned the Lighthouse badge! #Fitbit","shortDescription":"50 floors","shortName":"Lighthouse","timesAchieved":2,"value":50},{"badgeGradientEndColor":"00D3D6","badgeGradientStartColor":"007273","badgeType":"LIFETIME_FLOORS","category":"Lifetime Climb","cheers":[],"dateTime":"2017-01-24","description":"2,000 lifetime floors","earnedMessage":"Yipee! You've earned the Hot Air Balloon badge!","encodedId":"228T9T","image100px":"https://static0.fitbit.com/images/badges_new/100px/badge_lifetime_floors2k.png","image125px":"https://static0.fitbit.com/images/badges_new/125px/badge_lifetime_floors2k.png","image300px":"https://static0.fitbit.com/images/badges_new/300px/badge_lifetime_floors2k.png","image50px":"https://static0.fitbit.com/images/badges_new/badge_lifetime_floors2k.png","image75px":"https://static0.fitbit.com/images/badges_new/75px/badge_lifetime_floors2k.png","marketingDescription":"By climbing 2000 lifetime floors, you've earned the Hot Air Balloon badge!","mobileDescription":"That's as high as a hot air balloon! You are really blowing up the lifetime badges list.","name":"Hot Air Balloon (2,000 lifetime floors)","shareImage640px":"https://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_lifetime_floors2k.png","shareText":"I climbed 2,000 floors with my #Fitbit and earned the Hot Air Balloon badge.","shortDescription":"2,000 floors","shortName":"Hot Air Balloon","timesAchieved":1,"value":2000}],"waterUnit":"METRIC","waterUnitName":"ml","weight":85.7,"weightUnit":"en_US"}}}}
steps = {"activities-steps":[{"dateTime":"2017-01-23","value":"16000"},{"dateTime":"2017-01-24","value":"19652"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-30","value":"13058"},{"dateTime":"2017-01-31","value":"7407"}]}
calories = {"activities-calories":[{"dateTime":"2017-01-23","value":"16000"},{"dateTime":"2017-01-24","value":"19652"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-30","value":"13058"},{"dateTime":"2017-01-31","value":"7407"}]}
floors= {"activities-floors":[{"dateTime":"2017-01-23","value":"16000"},{"dateTime":"2017-01-24","value":"19652"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-30","value":"13058"},{"dateTime":"2017-01-31","value":"7407"}]}
distance= {"activities-distance":[{"dateTime":"2017-01-23","value":"16000"},{"dateTime":"2017-01-24","value":"19652"},{"dateTime":"2017-01-25","value":"13643"},{"dateTime":"2017-01-26","value":"21654"},{"dateTime":"2017-01-27","value":"21268"},{"dateTime":"2017-01-30","value":"13058"},{"dateTime":"2017-01-31","value":"7407"}]}
*/
//renders the activity center html page//
acRouter.get('/',function(req,res){
  token = app.token();
  authorization = 'Bearer '+token.accessToken;
//Insert profile data into member_profiles collection if user does not exist
//else update logInDate to today's date

profileSchema.findByIdAndUpdate({"_id":token.profile.id},{$set:{log:{logInDate: currentDate}}},function(err,profileID)
  {
    if(err) throw err;
    if(profileID==null)
      {
        lastLogInDate = dateFormat(decrementDate(date,6));
        profileInsert(function(profile)
          {
            console.log('profile created'+ profile);
            apiCall(function(call){
              console.log(call);
              activityCreate(function(activity){
                console.log('activity created:'+activity);
                updateObject(function(updateObj){
                  console.log('update object created:'+JSON.stringify(updateObj));
                  activityUpdate(updateObj,function(update){
                    console.log(update);
                    res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\activityCenter.html');
                  })
                })
              })
            })
          })
    }
    else{
      lastLogInDate = profileID.log.logInDate;
      apiCall(function(call){
        console.log(call);
        updateObject(function(updateObj){
          console.log('update object created:'+updateObj);
          activityUpdate(updateObj,function(update){
            console.log(update);
            res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\activityCenter.html');
          })
        })
      })
    }
  })
  //res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\index.html');
  //res.sendFile('C:\\Users\\rakes\\Node\\rest-server\\views\\activityCenter.html');
  });

acRouter.get('/steps7d',function(req,res){
  stepsKeyObj('steps',7,function(obj){
    activitySchema.findById(token.profile.id,obj.steps, function(err, steps7d){
      res.json(steps7d);
    })
  })
})

acRouter.get('/activity/:date', function(req,res){
  activityKeyObj(req.params.date,function(obj){
    activitySchema.findById(token.profile.id,obj.activity,function(err,activity1d){
      res.json(activity1d);
    })
  })
})

acRouter.get('/leaderBoard',function(req,res){
    activitySchema.aggregate([{$match:{}},
      { $project:{values:['$steps.2017-01-26','$steps.2017-01-27','$steps.2017-01-28']}},
      {$unwind:"$values"},
      {$group:{_id:{id:'$_id'},count:{$sum:'$values'}}},
      { $sort: {count : -1 } }], 
      function(err,stepsAgg){
        //console.log(stepsAgg);
        res.json(stepsAgg);
    })
})

/*
stepsKeyObj('steps',7,function(a){
  console.log(a)
})
*/
function stepsKeyObj(str,range,callback){
  var stDate = new Date();
  var a = '';
  for (var i = range-1; i >=0; i--){
    if (i != 0){
      a = a + '\"'+str+'.'+dateFormat(stDate)+'\":1,';
      decrementDate(stDate,1);
    }
    else{
    a = a + '\"'+str+'.'+dateFormat(stDate)+'\":1';
    decrementDate(stDate,1);
  }
}
a = '{\"'+str+'\":{'+a+'}}';
callback(JSON.parse(a));
}

function activityKeyObj(date,callback){
  var a =  '\"steps.'+date+'\":1,'+'\"calories.'+date+'\":1,'+'\"floors.'+date+'\":1,'+'\"distance.'+date+'\":1';
  a = '{\"activity\":{'+a+'}}';
  console.log(a);
  callback(JSON.parse(a));
}

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

//function creates activity document for new users in activities schema
function activityCreate(callback)
{
  activitySchema.create({_id:token.profile.id,steps:{},calories:{},floors:{},distance:{}},function(err,create){
    if(err) throw err;
    callback(create);
})
};

//function updates activities document
function activityUpdate(obj,callback)
{
    activitySchema.findByIdAndUpdate(token.profile.id,{$set:obj.activity},{new : true},function(err,update){
      if (err) throw err;
        callback(update);
  })
};


// function sets update values to obj object
function updateObject(callback){
    var obj = '';
    var stepsString='';
    var caloriesString='';
    var activityString = '';
    var floorsString='';
    var distanceString = '';
    for (i = steps["activities-steps"].length-1 ;i>=0; i--){
      if (i!=0){
        stepsString = stepsString+'\"steps.' + steps["activities-steps"][i]["dateTime"]+'\":'+steps["activities-steps"][i]["value"]+',';
        caloriesString = caloriesString+'\"calories.' + calories["activities-calories"][i]["dateTime"]+'\":'+calories["activities-calories"][i]["value"]+',';
        if(floors["activities-floors"]) {
          floorsString = floorsString+'\"floors.' + floors["activities-floors"][i]["dateTime"]+'\":'+floors["activities-floors"][i]["value"]+',';
        }
        distanceString = distanceString+'\"distance.' + distance["activities-distance"][i]["dateTime"]+'\":'+distance["activities-distance"][i]["value"]+',';

      }
      else{
        stepsString = stepsString+'\"steps.' + steps["activities-steps"][i]["dateTime"]+'\":'+steps["activities-steps"][i]["value"]+',';
        caloriesString = caloriesString+'\"calories.' + calories["activities-calories"][i]["dateTime"]+'\":'+calories["activities-calories"][i]["value"]+',';
        if(floors["activities-floors"]) {
          floorsString = floorsString+'\"floors.' + floors["activities-floors"][i]["dateTime"]+'\":'+floors["activities-floors"][i]["value"]+',';
        }
        distanceString = distanceString+'\"distance.' + distance["activities-distance"][i]["dateTime"]+'\":'+distance["activities-distance"][i]["value"];
      }
    }
    activityString = '{\"activity\":{'+stepsString+caloriesString+floorsString+distanceString+'}}';
    obj = JSON.parse(activityString)
    console.log('aaaaaaa'+obj);
    callback(obj);
};

//Steps Section
function apiStepsCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/steps/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      steps = JSON.parse(body);
      console.log(steps);
      callback(steps);
    });
  }




//Calories apicall
function apiCaloriesCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/calories/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      calories = JSON.parse(body);
      console.log(calories);
      callback(calories);
    });
  }

//Distance apicall
  function apiDistanceCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/distance/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      distance = JSON.parse(body);
      console.log(distance);
      callback(distance);
    });
  }

//floors api call
  function apiFloorsCall(callback){
    request({
      uri: "https://api.fitbit.com/1/user/-/activities/floors/date/"+lastLogInDate+"/"+currentDate+".json",
      method: "GET",
      headers:{"Authorization":authorization}
      }, function(error, response, body) {
      floors = JSON.parse(body);
      console.log(floors);
      callback(floors);
    });
  }

//function calls all api's
function apiCall(callback){
  apiStepsCall(function(a){
    apiCaloriesCall(function(b){
      apiFloorsCall(function(c){
        apiDistanceCall(function(d){
          callback('4 api calls made')
        })
      })
    })
  })
}



acApp.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = acRouter;
