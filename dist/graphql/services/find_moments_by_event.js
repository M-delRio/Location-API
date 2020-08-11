"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Moment = _interopRequireDefault(require("../../models/Moment"));

var _find_event = _interopRequireDefault(require("./find_event"));

// const findEvent = async (obj: any, args: { id: string }) => {
var findMomentsByDate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args) {
    var targetEvent, startTime, endTime, fetchedMoments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _find_event["default"])({}, {
              id: args.id
            });

          case 2:
            targetEvent = _context.sent;
            startTime = targetEvent.start;
            endTime = targetEvent.end;
            console.log(startTime, endTime);
            _context.prev = 6;
            _context.next = 9;
            return _Moment["default"].find({
              start: {
                $gte: startTime,
                $lt: endTime
              }
            });

          case 9:
            fetchedMoments = _context.sent;
            return _context.abrupt("return", fetchedMoments);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 13]]);
  }));

  return function findMomentsByDate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = findMomentsByDate;
exports["default"] = _default;