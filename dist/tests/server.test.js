"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _mongoose = _interopRequireDefault(require("mongoose"));

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
      var res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return request.get("/graphql?query={event(id:\"5f2b94ce639af760fb9fdc69\"){_id}}");

            case 2:
              res = _context.sent;
              // .query({query:
              //   {
              //     event(id: "5f2b94ce639af760fb9fdc69") {
              //       _id
              //       type
              //   }
              // }})
              // expect(body.status).toBe("ok");
              expect(res.statusCode).toEqual(200);
              done();

            case 5:
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
      var res;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return request.get("/graphql?query={event(id:\"5f2b94ce639af760fb9fdc69\"){_idee}}");

            case 2:
              res = _context3.sent;
              // expect(res.body).toEqual(expectedResponse);
              expect(res.statusCode).toEqual(400);
              done();

            case 5:
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
              expect(res.statusCode).toEqual(200);
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
              expect(res.statusCode).toEqual(400);
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