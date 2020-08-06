"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressGraphql = require("express-graphql");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _graphql = _interopRequireDefault(require("./graphql"));

// import router from "./routes";
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use("/graphql", (0, _cors["default"])(), _bodyParser["default"].json(), (0, _expressGraphql.graphqlHTTP)({
  schema: _graphql["default"],
  graphiql: true
})); // app.get("/", (req, res) => {
//   res.send(`Number to English is waiting for your numbers.`);
// });
// app.use("/v1", router);

var _default = app;
exports["default"] = _default;