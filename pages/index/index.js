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

var _stringify = require('../../vendor/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _wcf = require('../../vendor/weichen-weapp-framework/wcf');

var _wcf2 = _interopRequireDefault(_wcf);

var _SayHi = require('../../components/SayHi/SayHi');

var _SayHi2 = _interopRequireDefault(_SayHi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _index = {
  _bind: { "sayHi": { "content": { "key": "motto" } } },
  _event: { "sayHi": { "increment": "incrementTotal" } },
  components: {
    sayHi: _SayHi2.default
  },
  data: function data() {
    return {
      motto: 'Hello World',
      userInfo: {},
      helloText: ''
    };
  },

  watch: {
    userInfo: function userInfo(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.helloText = '\u4F60\u597D\uFF01' + newVal.nickName + ' ';
    }
  },
  computed: {
    getText: function getText() {
      return 'Hello ' + this.userInfo.nickName + '!';
    }
  },
  methods: {
    //事件处理函数
    bindViewTap: function bindViewTap(e) {
      // console.log(this)
      this.hello(e);
      wx.navigateTo({
        url: '../logs/logs'
      });
    },
    setMotto: function setMotto(e) {
      this.motto = 'New World';
    },
    hello: function hello(e) {
      var userInfo = JSON.parse((0, _stringify2.default)(this.userInfo));
      userInfo.nickName = 'Jack';
      this.userInfo = userInfo;
    },
    incrementTotal: function incrementTotal(data) {
      console.log('total: ', data);
    }
  },
  onLoad: function onLoad() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    this.$root.getUserInfo(function (userInfo) {
      //更新数据
      that.userInfo = userInfo;
    });
  }
};

var Index = function (_core$PageClass) {
  (0, _inherits3.default)(Index, _core$PageClass);

  function Index() {
    (0, _classCallCheck3.default)(this, Index);
    return (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).apply(this, arguments));
  }

  return Index;
}(_wcf2.default.PageClass);

exports.default = Index;


_index.constructor = Index;
(0, _assign2.default)(Index.prototype, _index);

Page(_wcf2.default.createPage(Index));