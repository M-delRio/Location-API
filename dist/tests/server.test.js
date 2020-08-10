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
              expect(res.statusCode).toBe(200);
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
              expect(res.statusCode).toBe(400);
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
      var expectedBody, res;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              expectedBody = {
                "data": {
                  "momentsByEvent": [{
                    "_id": "5f2b94cd639af760fb9fda13",
                    "analysis_type": "processed",
                    "definition_id": "nearby_work"
                  }]
                }
              };
              _context6.next = 3;
              return request.get("/graphql?query={momentsByEvent(id:\"5f2b94ce639af760fb9fdbf9\"){_id, analysis_type, definition_id}}");

            case 3:
              res = _context6.sent;
              expect(res.body).toEqual(expectedBody);
              expect(res.statusCode).toBe(200);
              done();

            case 7:
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
              // expect(res.body).toEqual(expectedResponse);
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
describe("query events that occurred on a specific date", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("response with valid date query arg", /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(done) {
      var res;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return request.get("/graphql?query={eventsOnDate(date:\"2017-10-01\", timezone: \"%2B02:00\"){type}}");

            case 2:
              res = _context8.sent;
              expect(res.statusCode).toBe(200);
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
  it("response with invalid subfield", /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(done) {
      var res;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return request.get("/graphql?query={eventsOnDate(date:\"2017-10-01\", timezone: \"%2B02:00\"){typee}}");

            case 2:
              res = _context9.sent;
              expect(res.statusCode).toBe(400);
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
describe("query all events", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("valid return according to pagination", /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(done) {
      var res;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return request.get("/graphql?query={events(limit:1, offset: 1){_id}}");

            case 2:
              res = _context10.sent;
              expect(res.body.data.events.length).toBe(1);
              done();

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x10) {
      return _ref10.apply(this, arguments);
    };
  }());
  it("valid return according to pagination", /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(done) {
      var res;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return request.get("/graphql?query={events(limit:11, offset: 1){_id}}");

            case 2:
              res = _context11.sent;
              expect(res.body.data.events.length).toBe(11);
              done();

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }()); // it("response with invalid subfield", async (done) => {
  //   const res = await request
  //     .get(`/graphql?query={eventsOnDate(date:"2017-10-01", timezone: "%2B02:00"){typee}}`)
  //   expect(res.statusCode).toBe(400)
  //   done();
  // });
});
describe("query events that are related to a moment", function () {
  beforeAll(function () {
    _mongoose["default"].connect(uri, options);
  });
  afterAll(function (done) {
    _mongoose["default"].disconnect(done);
  });
  it("response with existing object id", /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(done) {
      var expectedBody, res;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              expectedBody = {
                "data": {
                  "momentsByEvent": [{
                    "_id": "5f2b94cd639af760fb9fda13",
                    "analysis_type": "processed",
                    "definition_id": "nearby_work"
                  }]
                }
              };
              _context12.next = 3;
              return request.get("/graphql?query={momentsByEvent(id:\"5f2b94ce639af760fb9fdbf9\"){_id, analysis_type, definition_id}}");

            case 3:
              res = _context12.sent;
              expect(res.body).toEqual(expectedBody);
              expect(res.statusCode).toBe(200);
              done();

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x12) {
      return _ref12.apply(this, arguments);
    };
  }());
  it("error with invalid subfield", /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(done) {
      var res;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return request.get("/graphql?query={momentsByEvent(idee:\"5f2b94ce639af760fb9fdbf9\"){_id, analysis_type, definition_id}}");

            case 2:
              res = _context13.sent;
              // expect(res.body).toEqual(expectedResponse);
              expect(res.statusCode).toBe(400);
              done();

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x13) {
      return _ref13.apply(this, arguments);
    };
  }());
});