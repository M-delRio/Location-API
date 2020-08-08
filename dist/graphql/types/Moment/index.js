"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type Moment {\n    _id: ID!,\n    start: String!,\n    end: String!,\n    analysis_type: String!,\n    definition_id: String!\n  }\n  \n  type Query {\n    momentsByEvent(id: String!): [Moment]\n  }\n";
exports["default"] = _default;