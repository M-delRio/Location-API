For the test, we would like you to build a small API with information about the user’s behavior. Data is fetched and exposed in form of a timeline for dashboards and usage by clients.

(I've placed the JSON dataset that was provided in the `db/mock_data.json` file.)

TypeScript and GraphQL must be used.

# Assignment

For the test, we are going to fetch, store and expose this data for dashboards and usage by clients.

## Database
- A dataset can be imported to a database management system of your choice (e.g. PostgreSQL)
- Foresee a unique identifier for events and moments we store

## API
Create a GraphQL web service that exposes the dataset for a user’s timeline
1. A user can query an ​event​ by a unique identifier
2. A user can query all related ​moments​ for an event
3. A user can query a chronological (paged) list of ​events
4. A user can query ​events​ that occurred on a specific date (e.g. 1st of October 2017)

Include the required steps or comments such that it’s a production-ready service which will handle a lot of data/load and might require to scale out horizontally; 

## Deliverable
- Source code​: either an archive file or a link to a private repository on Github or Bitbucket)
- Documentation​: any instructions required to setup, run and build your solution from a fresh clone.

Also include the assumptions and decisions you've made solving this task, including technology and library choices.
 