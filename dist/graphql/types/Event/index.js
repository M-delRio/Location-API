"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Event {\n    _id: ID!,\n    type: String!,\n    start: String!,\n    end: String!,\n    analysis_type: String!,\n    mode: String,\n    distance: String,\n    waypoints: String,\n    trajectory: String,\n    latitude: String,\n    longitude: String,\n    location: String,\n  }\n\n  type Query {\n    event(id: String!): Event\n    events: [Event!]\n  }\n";
exports["default"] = _default;