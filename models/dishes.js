var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	rating: {
		type : Number,
		min : 1,
		max : 5,
		required : true
	},

	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
},
	{
		timestamps: true
	});


var dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
		image:{
		type: String,
		required: false
	},
	category:{
		type: String,
		required: false
	},
	label:{
		type: String,
		required: false,
		default:''
	},
	price:{
		type: Currency
	},
	description: {
		type: String,
		required: true
	},
	comments:[commentSchema]
},
{
	timestamps:true
});

var Dishes = mongoose.model('dish',dishSchema);

module.exports = Dishes;

