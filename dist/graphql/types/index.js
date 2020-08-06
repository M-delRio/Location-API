"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _merge = require("@graphql-tools/merge");

var _Moment = _interopRequireDefault(require("./Moment/"));

var typeDefs = [_Moment["default"]];

var _default = (0, _merge.mergeTypeDefs)(typeDefs);

exports["default"] = _default;