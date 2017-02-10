case 1: Embedded Field Model

Sample Data:
{
        "_id" : "477CNF",
        "updatedAt" : ISODate("2017-02-03T06:02:15.910Z"),
        "createdAt" : ISODate("2017-02-02T07:29:19.324Z"),
        "__v" : 0,
        "distance" : {
                "2017-01-26" : 21654,
                "2017-01-27" : 21268
        },
        "floors" : {
                "2017-01-26" : 21654,
                "2017-01-27" : 21268
        },
        "calories" : {
                "2017-01-26" : 21654,
                "2017-01-27" : 21268
        },
        "steps" : {
                "2017-01-26" : 21654,
                "2017-01-27" : 21268
        }
}


//inserting worked

db.case1.insert({_id:'abc1','steps':{'2017-01-23': 1000 ,'2017-01-24': 2000},'distance':{'2017-01-23': 1000 ,'2017-01-24': 2000},'floors':{'2017-01-23': 1000 ,'2017-01-24': 2000},'calories':{'2017-01-23': 1000 ,'2017-01-24': 2000}})


//updating worked
db.case1.update({_id:'abc1'},{$set:{'steps.2017-01-23': 4000}})

//removing a field
db.case1.update({_id:'abc1'},{$unset:{'steps.2017-01-31': 1}})

//updating worked with multiple values at the same time
db.case1.update({_id:'abc1'},{$set:{'steps.2017-01-27': 2000,'steps.2017-01-28': 2000,'steps.2017-01-29': 2000,'steps.2017-01-30': 2000,'steps.2017-01-31': 2000,'steps.2017-02-01': 2000,'steps.2017-02-02': 2000}})

//retreiving data for a given day
db.case1.find({},{'steps.2017-01-23':1})

//retreiving data for multiple days at the same time
db.case1.find({},{'steps.2017-01-23':1,'steps.2017-01-26':1,'steps.2017-01-27':1})

//retreiving data for multiple days from multiple embedded fields at the same time
db.case1.find({},{'steps.2017-01-23':1,'steps.2017-01-24':1,'distance.2017-01-23':1})

//aggregating across multiple documents
db.activities.aggregate([{$match:{}},{ $project:{values:['$steps.2017-01-26','$steps.2017-01-27','$steps.2017-01-28']}},{$unwind:"$values"},{$group:{_id:{id:'$_id'},count:{$sum:'$values'}}},{ $sort: {count : -1 } }])

comments:
+ve:
1. able to perform most of the operations using bulk data
2. single update statement unsets and sets values on multiple embedded fields
3. Model is suitable for fast inserts, updates, deletes and retreival. Suitable for modeling data coming from sensors on a minute by minute or
	second by second basis
4. Entire document requires less storage space
5. Document is light and the entire docment can be passed on as a single JSON object for applications to use

-ve:
1. unable to query data based on date range
2. DML operations need construction of a string in the right format

*****************************************************************************************************************************

Case 2: Embedded Document Model

Sample Data:

{
        "_id" : "abc1",
        "steps" : [
                {
                        "dateTime" : ISODate("2017-01-23T00:00:00Z"),
                        "value" : 15632
                },
                {
                        "dateTime" : ISODate("2017-01-24T00:00:00Z"),
                        "value" : 19652
                }
        ],
        "distance" : [
                {
                        "dateTime" : ISODate("2017-01-23T00:00:00Z"),
                        "value" : 15632
                },
                {
                        "dateTime" : ISODate("2017-01-24T00:00:00Z"),
                        "value" : 19652
                }
        ]
}

--------------------------------------------------------------------------------------------------------------------------------------
//insert
db.case3.insert({_id:'abc1','steps':[{dateTime:new Date("2017-01-23"), value: 15632} ,{dateTime:new Date("2017-01-24"),value: 19652}],
'distance':[{dateTime:new Date("2017-01-23"), value: 15632} ,{dateTime:new Date("2017-01-24"),value: 19652}]})

//Inserting new embedded document into a single array
db.case3.update({_id:'abc1'},{$push:{'steps':{dateTime:new Date("2017-01-25"), value: 1000}}})

//Inserting multiple embedded documents into a single array
db.case3.update({_id:'abc1'},{$push:{'steps':{$each:[{dateTime:new Date("2017-01-26"), value: 1000},{dateTime:new Date("2017-01-27"), value: 1000}]}}})

//Inserting single embedded documents into multiple arrays
db.case3.update({_id:'abc1'},{$push:{'steps':{dateTime:new Date("2017-01-28"), value: 1000},
'distance':{dateTime:new Date("2017-01-28"), value: 1000}}})

//Inserting multiple embedded documents into multiple arrays is not possible

----------------------------------------------------------------------------------------------------------------------------------------

//Retreives the entire document when the condition matches
db.case3.find({"steps.dateTime" : new ISODate("2017-01-23") });

//$ projection is used to retreive only the first embedded document that matches the date criteria. 
//'distance.$' projection cannot be used since the document query is on steps field
db.case3.find({"steps.dateTime" : new ISODate("2017-01-23") },{'steps.$':1});

//$elemMatch allows for the projection based on conditions not in the query. But retreives only one document
//$elemMatch retreives only the first matched embedded document
db.case3.find({'steps':{$elemMatch:{"dateTime" : {$gt: new ISODate("2017-01-22")}}}},{'steps.$':1}).pretty()

//need to perform aggregate operation to retreive all documents that match a given condition
db.case3.aggregate([{$match:{_id:"abc1"}},{$project:{"steps":1}},{$unwind:"$steps"},{$match:{"steps.dateTime":{$gt:new Date("2017-01-22")}}}])


---------------------------------------------------------------------------------------------------------------------------------------
//updating a value in an embedded document
db.case3.update({_id:'abc1','steps.dateTime':new ISODate("2017-01-23")},{$set:{'steps.$.value':2000}})

---------------------------------------------------------------------------------------------------------------------------------------
//$pull removes all embedded documents that match the specified datetime
db.case3.update({_id:'abc1'},{$pull:{'steps':{dateTime:new Date("2017-01-26")}}})

db.case3.update({_id:'abc1'},{$pull:{'steps':{$or:[{dateTime:new Date("2017-01-24")},{dateTime:new Date("2017-01-25")}]}}})

--------------------------------------------------------------------------------------------------------------------------------------
Comments:

+ve:
1. Easy to construct queries to perform DML operations

-ve:
1. Retreiving all embedded documents that satisfy a condition requires running an aggregate operation
2. Data model takes more storage space than the embedded field model
3. The entire document can be sent over to the application as a JSON object but requires the application to loop over the array to 
	retreive embedded documents
4. Multiple update statements need to be issued, to add or remove documents to fields that hold arrays. Single update statement will
	not update or remove all fields that hold arrays
5. Documents need to be removed before adding new ones to avoid duplicate documents



