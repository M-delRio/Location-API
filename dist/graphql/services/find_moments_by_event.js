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
            // console.log(targetEvent);
            startTime = targetEvent.start;
            endTime = targetEvent.end;
            console.log(startTime);
            console.log(endTime);
            _context.prev = 7;
            _context.next = 10;
            return _Moment["default"].find({
              start: {
                $gte: startTime
              },
              end: {
                $lt: endTime
              }
            });

          case 10:
            fetchedMoments = _context.sent;
            return _context.abrupt("return", fetchedMoments);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 14]]);
  }));

  return function findMomentsByDate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = findMomentsByDate; // items.find({
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

exports["default"] = _default;