"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('./vendor/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('./vendor/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _wcf = require('./vendor/weichen-weapp-framework/wcf');

var _wcf2 = _interopRequireDefault(_wcf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _app = {
	config: {
		"pages": ["pages/page_a/page_a", "pages/index/index", "pages/logs/logs"],
		"window": {
			"backgroundTextStyle": "light",
			"navigationBarBackgroundColor": "#fff",
			"navigationBarTitleText": "WeChat",
			"navigationBarTextStyle": "black"
		}
	},
	data: function data() {
		return {
			globalData: {
				userInfo: null,
				datas: []
			}
		};
	},

	methods: {
		getUserInfo: function getUserInfo(cb) {
			var that = this;
			if (this.globalData.userInfo) {
				typeof cb == "function" && cb(this.globalData.userInfo);
			} else {
				this.globalData.userInfo = {
					avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKAeEsECeBuIl0Bx4Z1yWfD7szuNXHW5uJB9SGoz4ibKK67MXn0aF1m4qic5dwBxvsO7p3ffZOem3HQ/0",
					city: "Ningbo",
					country: "CN",
					gender: 1,
					language: "zh_CN",
					nickName: "Mr.Hu",
					province: "Zhejiang"
				};
				typeof cb === 'function' && cb(this.globalData.userInfo);
				//调用登录接口
				/*wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })*/
			}
		}
	},
	onLaunch: function onLaunch() {
		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	}
};

var AppClass = function AppClass() {
	(0, _classCallCheck3.default)(this, AppClass);
};

exports.default = AppClass;


_app.constructor = AppClass;
(0, _assign2.default)(AppClass.prototype, _app);

App(_wcf2.default.createApp(AppClass));