"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find_event = _interopRequireDefault(require("../../services/find_event"));

var _find_events_on_date = _interopRequireDefault(require("../../services/find_events_on_date"));

// The Event schema
var _default = {
  Query: {
    event: _find_event["default"],
    eventsOnDate: _find_events_on_date["default"] // event: async (obj: any, args: { id: string }) => {
    //   try {
    //     const fetchedEvent = await Event.findById({ "_id": args.id });
    //     return fetchedEvent;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

  }
};
exports["default"] = _default;