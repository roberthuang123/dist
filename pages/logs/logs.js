'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('../../vendor/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('../../vendor/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('../../vendor/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('../../vendor/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../../vendor/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _wcf = require('../../vendor/weichen-weapp-framework/wcf');

var _wcf2 = _interopRequireDefault(_wcf);

var _util = require('../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _logs = {
	_bind: {},
	_event: {},
	config: {
		"navigationBarTitleText": "查看启动日志"
	},
	data: function data() {
		return {
			logs: []
		};
	},
	onLoad: function onLoad() {
		this.logs = (wx.getStorageSync('logs') || []).map(function (log) {
			return _util2.default.formatTime(new Date(log));
		});
	}
};

var Logs = function (_core$PageClass) {
	(0, _inherits3.default)(Logs, _core$PageClass);

	function Logs() {
		(0, _classCallCheck3.default)(this, Logs);
		return (0, _possibleConstructorReturn3.default)(this, (Logs.__proto__ || (0, _getPrototypeOf2.default)(Logs)).apply(this, arguments));
	}

	return Logs;
}(_wcf2.default.PageClass);

exports.default = Logs;


_logs.constructor = Logs;
(0, _assign2.default)(Logs.prototype, _logs);

Page(_wcf2.default.createPage(Logs));