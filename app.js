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

    client.close();
    // const collection = db.collection('documents');
  });
  
