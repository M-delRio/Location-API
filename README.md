# Production notes
## Query format
- the current use cases for our API all relate to query requests, as such HTTP GET requests are more semantically appropriate however existing support for POST requests can be added to future iterations of this documentation

# Location API

This GraphQL API accepts query params to a single endpoint. Data related `event` and `moment` objects can be queried as outlined below.

# Response - Succesful Request
```
{
  "data": {
    "subfield_name": "subfield value"
  }
}
Status: 200 OK
```

# Errors

Error responses contain a message related to the error type. Depending on the error type additional information may be included in the response.

## Example - Invalid Subfield
### Request
query {
  event(id: "5f2b94ce639af760fb9fdc69") {
     _idee
    type
  }
}

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

# Usage
GraphQL operations consist of multiline JSON. Submitting GET requests requires coercing JSON queries to query strings. Various tools exist to simplify sending queries such as [GraphiQL](https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355/)

The uses that follow each include the maximum amount of subfields that are available for a given query. 

## Query an ​event​ by a unique identifier
The *event field* requires an **id** argument. This argument, a string, is used to retrieve a specific Event. 

### sample request with all possible fields
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
    trajectory
    latitude
    longitude
    location {
      significance
    }
  }
}
```

## Query ​moments that relate to a specific event
The *event field* requires an **id** argument. This argument, a string, is used to target a an Event. All Moments that relate to the target Event (that occurred within the timeframe of the Event) or retrieved. 

### sample request with all possible fields
```console
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

## Query all ​events​ 
Events are returned in ascending order according to their start date. Pagination is supported with two optional arguments: **limit** and **offset**. 

The **limit** integer argument determines how many **Event** objects will be returned. 

The **offset** integer argument determines at which **Event** (**Events** are sorted according to their start date) the query should begin. 

### sample request with all possible fields
```console
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
    trajectory
    latitude
    longitude
    location {
      significance
    }
  }
}
```

## Query ​events​ that occurred on a specific date
The *event field* requires a **date** string argument with the following format: **"YYYY-MM-DD"**. This argument, a string, is used to retrieve all events that occurred on that day. 

The *event field* also accepts an optional **timezone** string argument with the following format: **+hh:mm** or **+hh:mm** . 

### sample request with all possible fields
```console
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
    trajectory
    latitude
    longitude
    location {
      significance
    }
  }
}
```

# Deployment

The API is still under development, the command below will deploy the server locally with the following endpoint
`localhost:3000/graphql`

To run the endpoint in production:
```console
`npm run build && npm start`
```

# Requirements
- Node.js
- MongoDB

# Database
MongoDB is used to store data. A non-relational DB is appropriate for our use case:
- **entity relationship**: there is a relationship between `events` and `moments` (an event can be associated with several moments) however this relationship is established dynamically by the `start` and `end` values of each entity
- **scaling**: given the volume of data collected horizontal scaling is likely and can be simpler with denormalized data 

The app is currently configured to retrieve data from a local store. To use the current version of the API MongoDB needs to be installed and running locally. A `location_api` database is required and can be created from the console with the following command
```console
mongod --dbpath=/location_api
```
The following command (executed from the root folder of the API) seeds the database: 
```console
npx ts-node ./db/seed_localdb.ts
```



