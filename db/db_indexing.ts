const MongoClient = require('mongodb').MongoClient
const fs = require('fs');
const url = "mongodb://localhost:27017/location_api";

// create start index
const createMomentIndex = async (db: any) => {
  const collection = db.collection('moments');

  try {
    collection.createIndex({ start: 1 })
  } catch (err) {
    console.log(err);
  }
}

// create start and end indices
const createEventIndices = async (db: any) => {
  const collection = db.collection('moments');

  try {
    collection.createIndex({ start: 1 })
  } catch (err) {
    console.log(err);
  }

  try {
    collection.createIndex({ end: 1 })
  } catch (err) {
    console.log(err);
  }
}

// driver function
const initializeDB = async () => {
  let client: any;

  try {
    client = await MongoClient.connect(url);
  } catch (err) {
    console.log(err);
  }
  const db = client.db("location_api")
  console.log("Connected successfully to server");

  // create moment index
  try {
    await createMomentIndex(db);
  } catch (err) {
    console.log(err);
  }

  // create event indices
  try {
    await createEventIndices(db);
  } catch (err) {
    console.log(err);
  }

  console.log("Indices successfully created");
  db.close();
}

initializeDB();