var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var fs = require('fs')

var insertOps = require("./insert.js");

var timedString = require('./timed_string.js');
 
// Connection URL 
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

// do insert  operation

// read the documents
  _read_src("./new.txt",db);

 
});


function _read_src(src_path,db){
	var remaining = ''; 
	fs.createReadStream(src_path).on('data', function(data) {   	
	    remaining += data;                                                                                                                         
	})
	.on("end",function(){
		func(remaining,db);
		console.log("end1");
		console.log("db operation done");
//		db.close();
	});

}

function func(data,db) {                                                                                                                                                                                                                                 
   console.log("insert one item done"); 

   var strlen = data.length;
   var strconst = 300;
   var strtop  = strlen/strconst;
   var inserttime = timedString.now();
   for(var i=0;i<strtop-2;i++){
		
   var data_seg = data.substring(i*strconst,(i+2)*strconst);
   inserttime = timedString.now();
   var content = 	{
		"title" :  inserttime,
		"text" : data_seg 
	};
  insertOps.insert(db,content,function(){
        console.log("insert complete.... : "+i);
  });    

   }	 

   inserttime = timedString.now();
   var data_seg = data.substring((i+1)*strconst);
   content = 	{
		"title" :  inserttime,
		"text" : data_seg 
	};
  insertOps.insert(db,content,function(){
        db.close();
        console.log("insert complete....");
  });    

}    



