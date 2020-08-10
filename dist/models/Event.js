"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var eventSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  analysis_type: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: false
  },
  distance: {
    type: Number,
    required: false
  },
  waypoints: {
    type: Array,
    required: false
  },
  trajectory: {
    type: _mongoose.Schema.Types.Mixed,
    required: false
  },
  latitude: {
    type: Number,
    required: false
  },
  longitude: {
    type: Number,
    required: false
  },
  location: {
    type: Array,
    required: false
  }
});

var Event = _mongoose["default"].model("Event", eventSchema, "events");

var _default = Event;
exports["default"] = _default;