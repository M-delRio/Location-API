"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Event = _interopRequireDefault(require("../../models/Event"));

// items.find({
//   created_at: {
//     $gte: "Mon May 30 18:47:00 +0000 2015",
//     $lt: "Sun May 30 20:40:36 +0000 2010"
//   }
// })
// .find({$and:[{startDate:{$lte:new Date()}},{endDate:{$gte:new Date()}}]})
// YYYY-MM-DD
// YYYY-mm-ddTHH:MM:ssZ
// 2017-10-01T23:28:00.000+02:00
// +hh:mm or -hh:mm
var findEventsOnDate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args) {
    var timeZone, startTime, endTime, fetchedEvent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            timeZone = "+00:00";

            if (args.timezone) {
              timeZone = args.timezone;
            }

            startTime = args.date + "T00:00:00" + timeZone;
            endTime = args.date + "T23:59:59.999" + timeZone; // console.log(startTime);
            // console.log(endTime);

            _context.prev = 4;
            _context.next = 7;
            return _Event["default"].find({
              start: {
                $gte: startTime
              },
              end: {
                $lt: endTime
              }
            });

          case 7:
            fetchedEvent = _context.sent;
            return _context.abrupt("return", fetchedEvent);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));

  return function findEventsOnDate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = findEventsOnDate;
exports["default"] = _default;