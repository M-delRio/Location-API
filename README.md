# Location API

This GraphQL API accepts query params to a single endpoint. Four query types are supported returning data related **Moment** and **Event** objects.

## The Moment Object 
```
{
  "start": "2017-10-01T23:28:00.000+02:00",
  "end": "2017-10-02T08:47:28.325+02:00",
  "analysis_type": "processed",
  "moment_definition_id": "home"
}
```

## The Event Object
```
{
  "type": "Transport",
  "start": "2017-09-01T09:10:59.040000+02:00",
  "end": "2017-09-01T09:24:45.999000+02:00",
  "analysis_type": "processed",
  "mode": "car",
  "distance": 3748,
  "waypoints": [
    {
      "type": "Waypoint",
      "latitude": 51.21406,
      "longitude": 4.39299,
      "timestamp": "2017-09-01T09:10:59.040000+02:00",
      "accuracy": 0
    }
  ],
  "trajectory": {
    "type": "TransportTrajectory",
    "encoded": "{encodedData}"
  }
}
```

## Requirements
- Node.js
- MongoDB

## Database
The app is currently configured to retrieve data from a local store. To use the current version of the API MongoDB needs to be installed and running locally. A `location_api` database is required and can be created from the console with the following command:
```
mongod --dbpath=/location_api
```

Run the following command (from the root folder of the app) to add indices to the **moments** (**start** field) and **events** (**start** and **end** field) collections

```
npx ts-node ./db/db_indexing.ts
```

Run the following command (from the root folder of the app) to seed the database: 
```
npx ts-node ./db/seed_db.ts
```

## Deployment
The command found below will deploy the server locally with the following endpoint
`localhost:3000/graphql`:
```
npm run build && npm start
```

## Requests
**GET** requests accept a query string with a single **query** field. The field value is a URL string representation of a JSON query. 

For example the following query expressed as JSON:
```
query {
  momentsByEvent(id: "5f2b94ce639af760fb9fdbf9") { 
    _id
    analysis_type
    definition_id
  }
}
```
translates to the following query string:
```
query={momentsByEvent(id:"5f2b94ce639af760fb9fdbf9"){_id, analysis_type, definition_id}}
```

For clarity request examples included in this documentation will be demonstrated with query values expressed as JSON. 

Various tools exist to simplify sending queries such as [GraphiQL](https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355/)

# Example - Succesful Request
## Request
```
query{
  events(limit:1, offset:1) { 
    _id
    type
    start
    end
    analysis_type
    mode
    distance
  }
}
```

## Response
```
{
  "data": {
    "events": [
      {
        "_id": "5f2b94cd639af760fb9fdbae",
        "type": "Transport",
        "start": "1504249859040",
        "end": "1504250685999",
        "analysis_type": "processed",
        "mode": "car",
        "distance": "3748"
      }
    ]
  }
}
Status: 200 OK
```


- time values (**start** and **end** attributes of **Moment** and **Event** objects) are returned as a string representation of epoch time values (in milliseconds)

# Errors

Error responses contain a message related to the error type. Depending on the error type additional information may be included in the response.

## Example - Invalid Subfield
### Request
```
query {
  event(id: "5f2b94ce639af760fb9fdc69") {
     _idee
    type
  }
}
```

### Response
```
{
  "errors": [
    {
      "message": "Cannot query field \"_i\" on type \"Event\". Did you mean \"_id\"?",
      "locations": [
        {
          "line": 3,
          "column": 6
        }
      ]
    }
  ]
}
Status: 400 Bad Request
```

# Use Cases
The uses that follow each include the maximum amount of subfields that are available for a given query. 

## 1. Query an ​event​ by a unique identifier
The *event field* requires an **id** argument. This argument, a string, is used to retrieve a specific Event. 

```console
query{
  event(id: "5f2b94ce639af760fb9fdc69") { 
    _id
    type
    start
    end
    analysis_type
    mode
    distance
    waypoints {
      type
      latitude
      longitude
      timestamp
      accuracy
    }
    trajectory {
      type
      encoded
    }
    latitude
    longitude
    location {
      significance
    }
  }
}
```

## 2. Query ​moments that relate to a specific event
The *event field* requires an **id** argument. This argument, a string, is used to target an Event. All Moments that relate to the target Event (that occurred within the timeframe of the Event) are returned. 

```
query{
  momentsByEvent(id: "5f2b94ce639af760fb9fdbf9") { 
    _id
    start
    end
    analysis_type
    definition_id
  }
}
```

## 3. Query all ​events​ 
Events are returned in ascending order according to their start date. Pagination is supported with two optional arguments: **limit** and **offset**. 

The **limit** integer argument determines how many **Event** objects will be returned. 

The **offset** integer argument determines at which **Event** (**Events** are sorted according to their start date) the query should begin. 

```
query{
  events(limit:1, offset:10) { 
    _id
    type
    start
    end
    analysis_type
    mode
    distance
    waypoints {
      type
      latitude
      longitude
      timestamp
      accuracy
    }
    trajectory {
      type
      encoded
    }
    latitude
    longitude
    location {
      significance
    }
  }
}
```

## 4. Query ​events​ that occurred on a specific date
The *event field* requires a **date** string argument with the following format: **"YYYY-MM-DD"**. This argument, a string, is used to retrieve all events that occurred on the specified date. 

The *event field* also accepts an optional **timezone** string argument with the following format: **+hh:mm** or **-hh:mm** . 

```
query{
  eventsOnDate(date: "2017-10-01", timezone: "+02:00") { 
    _id
    type
    start
    end
    analysis_type
    mode
    distance
    waypoints {
      type
      latitude
      longitude
      timestamp
      accuracy
    }
    trajectory {
      type
      encoded
    }
    latitude
    longitude
    location {
      significance
    }
  }
}
```

# Testing

A functional testing suite is available, written using Jest and Supertest. To run the test suite:

`npm run test`

# Production notes
## Query format
- the current use cases for our API all relate to query requests, as such HTTP GET requests are more semantically appropriate however existing support for POST requests can be added to future iterations of this documentation

## Database
MongoDB is used to store data. A non-relational DB is appropriate for our use case:
- **entity relationship**: there is a relationship between `events` and `moments` (an event can be associated with several moments) however this relationship is established dynamically by the `start` and `end` values of each entity
- **scaling**: given the volume of data collected horizontal scaling is likely and can be simpler with denormalized data 



