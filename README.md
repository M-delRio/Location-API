# Requirements/Dependencies
- Node.js
- MongoDB

# Database

MongoDB is used to store data. A non-relational DB is appropriate for our use case:
- **entity relationship**: there is a relationship between `events` and `moments` (an event can be associated with several moments) however this relationship is established dynamically by the `start` and `end` values of each entity
- **scaling**: given the volume of data collected horizontal scaling which is simpler with denormalized data 

The app is currently configured to retrieve data from a local store. To use the current version of the API MongoDB needs to be installed and running locally. A `location_api` database is required and can be created from the console with the following command
```console
mongod --dbpath=/location_api
```
The following command (executed from the root folder of the API) seeds the database: 
```console
npx ts-node ./db/seed_localdb.ts
```