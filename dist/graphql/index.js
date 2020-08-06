"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schema = require("@graphql-tools/schema");

var _types = _interopRequireDefault(require("./types"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var schema = (0, _schema.makeExecutableSchema)({
  typeDefs: _types["default"],
  resolvers: _resolvers["default"]
});
var _default = schema;
exports["default"] = _default;