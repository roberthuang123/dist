"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _page_a = {
  _bind: {},
  _event: {},
  config: {
    "navigationBarTitleText": "首页",
    "navigationBarBackgroundColor": "#262833",
    "navigationBarTextStyle": "white",
    "enablePullDownRefresh": true
  },
  data: function data() {
    return {
      userInfo: {},
      defaultSize: 'default',
      primarySize: 'mini',
      warnSize: 'default',
      disabled: false,
      plain: false,
      loading: false
    };
  },
  onLoad: function onLoad() {
    var that = this;
    wx.getUserInfo({
      success: function success(res) {
        console.log(res);
        that.userInfo = res.userInfo;
      }
    });
    wx.getLocation({
      type: 'wgs84',
      success: function success(res) {
        console.log(res, "address");
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
      }
    });
  },
  onPullDownRefresh: function onPullDownRefresh() {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 2000);
  },

  methods: {
    clickEvent: function clickEvent() {
      wx.showActionSheet({
        itemList: ['小秋秋饿了', '小秋秋在吃饭', '小秋秋好困啊'],
        success: function success(res) {
          var list = ['快去吃饭，小秋秋！', '多吃点啊，小秋秋！', '快点睡觉，小秋秋！'];
          wx.showToast({
            title: list[res.tapIndex],
            icon: 'none',
            duration: 1500
          });
        },
        fail: function fail(res) {
          console.log(res.errMsg);
        }
      });
    },
    primary: function primary() {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function success(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          });
        }
      });
    }
  }
};

var Page_a = function (_core$PageClass) {
  (0, _inherits3.default)(Page_a, _core$PageClass);

  function Page_a() {
    (0, _classCallCheck3.default)(this, Page_a);
    return (0, _possibleConstructorReturn3.default)(this, (Page_a.__proto__ || (0, _getPrototypeOf2.default)(Page_a)).apply(this, arguments));
  }

  return Page_a;
}(_wcf2.default.PageClass);

exports.default = Page_a;


_page_a.constructor = Page_a;
(0, _assign2.default)(Page_a.prototype, _page_a);

Page(_wcf2.default.createPage(Page_a));