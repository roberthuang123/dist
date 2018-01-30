"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('../babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    /**
     * 简单处理对象copy
     */
    $copy: function $copy() {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var isDeep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (isDeep) {
            return JSON.parse((0, _stringify2.default)(obj));
        }
        return (0, _assign2.default)({}, obj);
    },
    $noop: function $noop() {}
};