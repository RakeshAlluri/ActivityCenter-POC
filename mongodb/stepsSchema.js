
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
        dateTime:{type:String},
        value:{type:Number}
})

// create a schema
var stepsSchema = new Schema({
        _id:{type:String,required:true,unique:true}
        ,activity:[activitySchema]
},
{
        timestamps:true
}

);

// the schema is useless so far
// we need to create a model using it
var step = mongoose.model('step', stepsSchema);

// make this available to our Node applications
module.exports = step;