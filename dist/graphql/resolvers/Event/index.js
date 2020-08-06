"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Event = _interopRequireDefault(require("../../../models/Event"));

// The Event schema.
var _default = {
  Query: {
    event: function () {
      var _event = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args) {
        var fetchedEvent;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Event["default"].findById({
                  "_id": args.id
                });

              case 3:
                fetchedEvent = _context.sent;
                return _context.abrupt("return", fetchedEvent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function event(_x, _x2) {
        return _event.apply(this, arguments);
      }

      return event;
    }()
  }
};
exports["default"] = _default;