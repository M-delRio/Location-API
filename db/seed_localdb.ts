const MongoClient = require('mongodb').MongoClient
const fs = require('fs');
const url = "mongodb://localhost:27017/location_api";

// insert moment documents
const insertMoments = async (data: any, db: any) => {
  // get the moments collection
  const collection = db.collection('moments');

  data.forEach((moment: { start: string, end: string, analysis_type: string, moment_definition_id: string }) => {

    // insert the moment document
    try {
      collection.insertOne({
        start: new Date(moment.start),
        end: new Date(moment.end),
        analysis_type: moment.analysis_type,
        definition_id: moment.moment_definition_id
      });
    } catch (err) {
      console.log(err);
    }
  })
}

// insert event documents
const insertEvents = async (data: any, db: any) => {
  // get the moments collection
  const collection = db.collection('events');

  let event: any;

  // iterate event objects 
  for (let data_idx = 0; data_idx < data.length; data_idx += 1) {
    event = data[data_idx];

    // data.forEach((event: any) => {
    let result: any;

    //handle transport event 
    if (event.trajectory !== undefined) {

      // trajectory may be null
      let trajectory: null | ({ type: string, encoded: string }) = null

      // create trajectory object if a non-null value exists
      if (event.trajectory !== null) {
        trajectory = {
          type: event.trajectory.type,
          encoded: event.trajectory.encoded
        }
      }

      // write the document
      try {
        result = await collection.insertOne({
          type: event.type,
          start: new Date(event.start),
          end: new Date(event.end),
          analysis_type: event.analysis_type,
          mode: event.mode,
          distance: event.distance,
          waypoints: [],
          trajectory: trajectory
        });

      } catch (err) {
        console.log(err);
      }

      // update the transport document: add waypoints separately to create Date objects
      // iterate waypoints of the event
      event.waypoints.forEach((waypoint: { type: string, latitude: number, longitude: number, timestamp: string, accuracy: number }) => {
        try {
          collection.update(
            { _id: result.insertedId },
            {
              $push: {
                waypoints: {
                  type: waypoint.type,
                  latitude: waypoint.latitude,
                  longitude: waypoint.longitude,
                  timestamp: new Date(waypoint.timestamp),
                  accuracy: waypoint.accuracy
                }
              }
            })
        } catch (err) {
          console.log(err);
        }
      });

      //handle location events 
    } else {
      // write the document
      try {
        collection.insertOne({
          type: event.type,
          start: new Date(event.start),
          end: new Date(event.end),
          analysis_type: event.analysis_type,
          latitude: event.latitude,
          longitude: event.longitude,
          location: { significance: event.location.significance }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const seedDB = async () => {
  const mockData = fs.readFileSync('./db/mock_data.json');
  const rawData = JSON.parse(mockData).data.user;
  let client;

  try {
    client = await MongoClient.connect(url);
  } catch (err) {
    console.log(err);
  }
  const db = client.db("location_api")
  console.log("Connected successfully to server");

  // seed moments
  try {
    await insertMoments(rawData.moment_history, db);
  } catch (err) {
    console.log(err);
  }

  // seed events
  try {
    await insertEvents(rawData.event_history, db);
  } catch (err) {
    console.log(err);
  }

  console.log("Data successfully written to the DB");
  db.close();
}

seedDB();
