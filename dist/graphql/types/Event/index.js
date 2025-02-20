"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Waypoint {\n    type: String!,\n    latitude: String!,\n    longitude: String!,\n    timestamp: String!,\n    accuracy: String!\n  }\n\n  type Trajectory {\n    type: String!,\n    encoded: String!\n  }\n\n  type Location {\n    significance: String!\n  }\n\n  type Event {\n    _id: ID!,\n    type: String!,\n    start: String!,\n    end: String!,\n    analysis_type: String!,\n    mode: String,\n    distance: String,\n    waypoints: [Waypoint],\n    trajectory: Trajectory,\n    latitude: String,\n    longitude: String,\n    location: [Location],\n  }\n\n  type Query {\n    event(id: String!): Event\n    events(limit: Int, offset: Int): [Event]\n    eventsOnDate(date: String!, timezone: String): [Event]\n  }\n";
exports["default"] = _default;