"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Moment = _interopRequireDefault(require("../../../models/Moment"));

// The Moment schema.
var _default = {
  Query: {
    // moment: (root: any, args: any) => {
    //   return new Promise((resolve, reject) => {
    //     Moment.findOne(args).exec((err, res) => {
    //       err ? reject(err) : resolve(res);
    //     });
    //   });
    // },
    moments: function () {
      var _moments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var momentsFetched;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = console;
                _context.next = 4;
                return _mongoose["default"].connection.db;

              case 4:
                _context.t1 = _context.sent;

                _context.t0.log.call(_context.t0, _context.t1);

                console.log('hi');
                _context.next = 9;
                return _Moment["default"].find({});

              case 9:
                momentsFetched = _context.sent;
                // const momentsFetched = await Moment.findOne({ analysis_type: "processed" })
                console.log(momentsFetched);
                return _context.abrupt("return", {});

              case 14:
                _context.prev = 14;
                _context.t2 = _context["catch"](0);
                throw _context.t2;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function moments() {
        return _moments.apply(this, arguments);
      }

      return moments;
    }()
  }
};
exports["default"] = _default;