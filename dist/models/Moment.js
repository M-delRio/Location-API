"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var momentSchema = new _mongoose.Schema({
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
  definition_id: {
    type: String,
    required: true
  }
}); // const Moment = mongoose.model("Moment", momentSchema);

var Moment = _mongoose["default"].model("Moment", momentSchema, "moments");

var _default = Moment;
exports["default"] = _default;