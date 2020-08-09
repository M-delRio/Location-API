"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find_event = _interopRequireDefault(require("../../services/find_event"));

var _find_events_on_date = _interopRequireDefault(require("../../services/find_events_on_date"));

var _find_all_events = _interopRequireDefault(require("../../services/find_all_events"));

var _default = {
  Query: {
    event: _find_event["default"],
    events: _find_all_events["default"],
    eventsOnDate: _find_events_on_date["default"]
  }
};
exports["default"] = _default;