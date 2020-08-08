"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find_moments_by_event = _interopRequireDefault(require("../../services/find_moments_by_event"));

var _default = {
  Query: {
    momentsByEvent: _find_moments_by_event["default"]
  }
};
exports["default"] = _default;