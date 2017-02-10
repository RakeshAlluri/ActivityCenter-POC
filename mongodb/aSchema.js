var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var profileSchema = new Schema({
    name: 'String',
    description: 'Number' })



var Profiles = mongoose.model('Profile', profileSchema);

module.exports = Profiles;

