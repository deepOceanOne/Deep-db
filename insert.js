
var  assert = require('assert');


insertDocuments = function(db,content, callback) {
  // Get the documents collection 
  var collection = db.collection('hint');
  // Insert some documents 
  // describ, title, detail

  collection.insertMany([
    { title : content.title, text : content.text}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 1 documents into the document collection");
    callback(result);
  });
}



module.exports = {

	insert : insertDocuments

}
