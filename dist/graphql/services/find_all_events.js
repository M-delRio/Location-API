"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Event = _interopRequireDefault(require("../../models/Event"));

var findAllEvents = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj, args) {
    var fetchedEvents;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //set default value for limit
            if (args.limit === undefined) {
              args.limit = 5;
            } // set default value for offset


            if (args.offset == undefined) {
              args.offset = 1;
            }

            console.log(args.limit);
            console.log(args.offset);
            _context.prev = 4;
            _context.next = 7;
            return _Event["default"].find({}).sort({
              start: 1
            }).skip(args.offset).limit(args.limit);

          case 7:
            fetchedEvents = _context.sent;
            return _context.abrupt("return", fetchedEvents);

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

  return function findAllEvents(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = findAllEvents;
exports["default"] = _default;