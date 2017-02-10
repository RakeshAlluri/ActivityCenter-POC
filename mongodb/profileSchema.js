
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var profileSchema = new Schema({
        _id:{type:String,required:true,unique:true},
        provider : String,
        displayName : {type:String,required:true},
        age : {type:Number,required:true},
        country : {type:String,required:true},
        dateOfBirth : {type:String,required:true},
        displayName : {type:String,required:true},
        distanceUnit : String,
        fullName : {type:String,required:true},
        gender : {type:String,required:true},
        glucoseUnit : String,
        height : Number,
        heightUnit : String,
        locale : String,
        memberSince : String,
        offsetFromUTCMillis : Number,
        startDayOfWeek : String,
        strideLengthRunning : Number,
        strideLengthWalking : Number,
        swimUnit : String,
        timezone : String,
        waterUnit : String,
        waterUnitName : String,
        weight : Number,
        weightUnit : String,
        log:{
                logInDate:String
        }
},
{
        timestamps:true
}

);

// the schema is useless so far
// we need to create a model using it
var member_profile = mongoose.model('member_profile', profileSchema);

// make this available to our Node applications
module.exports = member_profile;