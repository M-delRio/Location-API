"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Event = _interopRequireDefault(require("../models/Event"));

var uri = "mongodb://127.0.0.1:27017/location_api";
var request = (0, _supertest["default"])(_server["default"]);
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
describe("query an ​event​ by a unique identifier", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("response with valid id query arg", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(done) {
      var fetchedEvent, res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Event["default"].findOne({
                "start": new Date("2017-10-01T23:19:58.178000+02:00")
              });

            case 2:
              fetchedEvent = _context.sent;
              _context.next = 5;
              return request.get("/graphql?query={event(id:\"".concat(String(fetchedEvent._id), "\"){_id}}"));

            case 5:
              res = _context.sent;
              expect(res.statusCode).toBe(200);
              done();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  it("response with non existant id query arg", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(done) {
      var expectedBody, res;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              expectedBody = {
                "data": {
                  "event": null
                }
              };
              _context2.next = 3;
              return request.get("/graphql?query={event(id:\"z\"){_id}}");

            case 3:
              res = _context2.sent;
              expect(res.body).toEqual(expectedBody);
              expect(res.statusCode).toBe(200);
              done();

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  it("error with invalid subfield", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(done) {
      var expectedResponse, res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expectedResponse = {
                "errors": [{
                  "message": "Cannot query field \"_idee\" on type \"Event\". Did you mean \"_id\" or \"mode\"?",
                  "locations": [{
                    "line": 1,
                    "column": 39
                  }]
                }]
              };
              _context3.next = 3;
              return request.get("/graphql?query={event(id:\"5f2b94ce639af760fb9fdc69\"){_idee}}");

            case 3:
              res = _context3.sent;
              expect(res.body).toEqual(expectedResponse);
              expect(res.statusCode).toBe(400);
              done();

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
});
describe("query events that occurred on a specific date", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("response with valid date query arg", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(done) {
      var res;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return request.get("/graphql?query={eventsOnDate(date:\"2017-10-01\", timezone: \"%2B02:00\"){type}}");

            case 2:
              res = _context4.sent;
              expect(res.statusCode).toBe(200);
              done();

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  it("response with invalid subfield", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(done) {
      var res;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return request.get("/graphql?query={eventsOnDate(date:\"2017-10-01\", timezone: \"%2B02:00\"){typee}}");

            case 2:
              res = _context5.sent;
              expect(res.statusCode).toBe(400);
              done();

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
});
describe("query events that are related to a moment", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("response with existing object id", /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(done) {
      var expectedBody, fetchedEvent, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              expectedBody = {
                "data": {
                  "momentsByEvent": [{
                    "start": "1506893084000",
                    "end": "1506893280000",
                    "analysis_type": "processed",
                    "definition_id": "nearby_home"
                  }]
                }
              };
              _context6.next = 3;
              return _Event["default"].findOne({
                "start": new Date("2017-10-01T23:19:58.178000+02:00")
              });

            case 3:
              fetchedEvent = _context6.sent;
              _context6.next = 6;
              return request.get("/graphql?query={momentsByEvent(id:\"".concat(String(fetchedEvent._id), "\"){start,end,analysis_type, definition_id}}"));

            case 6:
              res = _context6.sent;
              expect(res.body).toEqual(expectedBody);
              expect(res.statusCode).toBe(200);
              done();

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  it("error with invalid subfield", /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(done) {
      var res;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return request.get("/graphql?query={momentsByEvent(idee:\"5f2b94ce639af760fb9fdbf9\"){_id, analysis_type, definition_id}}");

            case 2:
              res = _context7.sent;
              expect(res.statusCode).toBe(400);
              done();

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());
});
describe("query all events", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("valid return according to pagination", /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(done) {
      var res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return request.get("/graphql?query={events(limit:1, offset: 1){_id}}");

            case 2:
              res = _context8.sent;
              expect(res.body.data.events.length).toBe(1);
              done();

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }());
  it("valid return according to pagination", /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(done) {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return request.get("/graphql?query={events(limit:11, offset: 1){_id}}");

            case 2:
              res = _context9.sent;
              expect(res.body.data.events.length).toBe(11);
              done();

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());
});