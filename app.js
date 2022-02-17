// jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// 27017 - MongoDB port - remains pretty much the same but customisable as with others
const url = 'mongodb://localhost:27017';
// newUrlParser - needed now to work with the native driver
const client = new MongoClient(url, {useNewUrlParser: true});

// Database Name
const dbName = 'fruitsDB';

// Use connect method to connect to the server
client.connect(function(err){
  assert.equal(null, err);

  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // do Database ops here and close the connection
  insertDocuments(db, function(){
    client.close();
  });
});

// Create a function to insert documents in Database
const insertDocuments = function(db, callback){
  // Get the collection "fruits"
  const collection = db.collection("fruits");
  // Insert documents - automatically creates if doesn't exist
  // insertMany(Array_of_documents, function_validate_using_assert)
  collection.insertMany([
    // document 1 - Mango
    {
      name: "Mango",
      points: 5,
      comment: "King of Fruits!"
    },
    // document 2 - Apple
    {
      name: "Apple",
      points: 5,
      comment: "Keeps the doctor away."
    },
    // document 3 - Banana
    {
      name: "Banana",
      points: 3,
      comment: "Meh!"
    }
  ],
  // Validations
  function(err, result){
    assert.equal(null, err);
    assert.equal(3, result.insertedCount);
    // assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents.")
    callback(result);
  });
};
