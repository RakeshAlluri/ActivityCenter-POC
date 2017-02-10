var mongoose = require('mongoose');
var assert = require('assert');
/*
var url = 'mongodb://localhost:27017/ltf';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("activity center");
    var collection = db.collection("member_profile");
    collection.insertOne({name: "Uthapizza", description: "test"});
    collection.find({name: "Uthapizza"}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found:");
            console.log(docs);
            
          })
    db.close();
  });
module.exports = db;