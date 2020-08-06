"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Waypoint {\n    type: String!,\n    latitude: String!,\n    longitude: String!,\n    timestamp: String!,\n    accuracy: String!\n  }\n\n  type Event {\n    _id: ID!,\n    type: String!,\n    start: String!,\n    end: String!,\n    analysis_type: String!,\n    mode: String,\n    distance: String,\n    waypoints: [Waypoint],\n    trajectory: String,\n    latitude: String,\n    longitude: String,\n    location: String,\n  }\n\n  type Query {\n    event(id: String!): Event\n    events: [Event!]\n  }\n";
exports["default"] = _default;