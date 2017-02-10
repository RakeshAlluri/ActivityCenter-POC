
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema
var activitySchema = new Schema({
        _id:{type:String,required:true,unique:true},
        steps: {type:Schema.Types.Mixed,required:true},
        calories:{type:Schema.Types.Mixed,required:true},
        floors:{type:Schema.Types.Mixed,required:true},
        distance:{type:Schema.Types.Mixed,required:true}
},
{
        timestamps:true
}

);


var activity = mongoose.model('activitie', activitySchema);

// make this available to our Node applications
module.exports = activity;