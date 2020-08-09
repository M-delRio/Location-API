export default `
  type Waypoint {
    type: String!,
    latitude: String!,
    longitude: String!,
    timestamp: String!,
    accuracy: String!
  }

  type Location {
    significance: String!
  }

  type Event {
    _id: ID!,
    type: String!,
    start: String!,
    end: String!,
    analysis_type: String!,
    mode: String,
    distance: String,
    waypoints: [Waypoint],
    trajectory: String,
    latitude: String,
    longitude: String,
    location: [Location],
  }

  type Query {
    event(id: String!): Event
    events(limit: Int, offset: Int): [Event]
    eventsOnDate(date: String!, timezone: String): [Event]
  }
`