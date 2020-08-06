"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _server = _interopRequireDefault(require("./server"));

var port = process.env.PORT || 3000;
var uri = "mongodb://127.0.0.1:27017/location_api"; // Connect to MongoDB with Mongoose and start server

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

_mongoose["default"].connect(uri, options).then(function () {
  return _server["default"].listen(port);
})["catch"](function (error) {
  throw error;
}).then(function () {
  return console.log("Listening on port ".concat(port, "!\n\nMongoDB connected"));
});