"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find_event = _interopRequireDefault(require("../../services/find_event"));

// The Event schema
var _default = {
  Query: {
    event: _find_event["default"] // event: async (obj: any, args: { id: string }) => {
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