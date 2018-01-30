'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyNames = require('../babel-runtime/core-js/object/get-own-property-names.js');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _PageClass = require('./PageClass.js');

var _PageClass2 = _interopRequireDefault(_PageClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREFIX = '$';
var cycles = ['onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onPageScroll'];

var noSetMethods = {
  'constructor': true,
  'data': true,
  'onLoad': true,
  'onShareAppMessage': true

  // 创建并绑定组件，把组件方法扁平化成wxPage对象方法
};var comsBind = function comsBind(config, com, prefix) {
  com.$coms = {};
  com.$prefix = prefix;
  (0, _getOwnPropertyNames2.default)(com.components || {}).forEach(function (name) {
    var comClass = com.components[name];
    var child = new comClass();
    name = name[0].toLowerCase() + name.slice(1 //组件名称首字母小写
    );child.$name = name;

    var comPrefix = prefix ? '' + prefix + name + PREFIX : '' + PREFIX + name + PREFIX;
    com.$coms[name] = child;
    comsBind(config, child, comPrefix);
  });

  var methods = (0, _getOwnPropertyNames2.default)(com.methods || {});
  methods.forEach(function (name) {
    com[name] = config['' + prefix + name] = function (event) {

      var params = [];
      if ((typeof event === 'undefined' ? 'undefined' : (0, _typeof3.default)(event)) == 'object' && event.target) {
        // 对事件传递的参数进行处理
        for (var start = 65, end = 90; start <= end; start++) {
          var i = 'wcf' + String.fromCharCode(start);
          var data = event.currentTarget.dataset[i];
          if (data == undefined) {
            break;
          }
          data === '$event' ? params.push(event) : params.push(data);
        }
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      params = params.length ? params : [event].concat(args);

      var rst = com.methods[name] && com.methods[name].apply(com, params);
      return rst;
    };
  });
};

exports.default = {
  createApp: function createApp(appClass) {
    var config = {};
    var app = new appClass();

    if (!this.$instance) {
      this.$instance = app;
    }

    (0, _getOwnPropertyNames2.default)(app.constructor.prototype || {}).forEach(function (name) {
      if (name !== 'constructor' && name !== 'data' && name !== 'methods') {
        config[name] = app.constructor.prototype[name];
      }

      if (name === 'methods') {
        (0, _keys2.default)(app.constructor.prototype.methods || {}).forEach(function (method) {
          config[method] = app.constructor.prototype.methods[method];
        });
      }
    });

    (0, _assign2.default)(config, app.data && app.data() || {});

    config.$app = app;
    return config;
  },
  createPage: function createPage(pageClass) {
    var config = {};
    var page = new pageClass();
    var app = this.$instance;
    var methods = [];
    var datas = [];
    var computeds = [];
    var watchs = [];

    (0, _getOwnPropertyNames2.default)(page.constructor.prototype || {}).forEach(function (name) {
      if (!noSetMethods[name]) {
        config[name] = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          page.constructor.prototype[name].apply(page, args);
        };
      }
    }

    // 处理onLoad
    );config.onLoad = function (obj) {
      page.init(this, app, getApp());
      page.onLoadEvt(obj);
    };

    // 处理其它生命周期回调
    cycles.forEach(function (cycle) {
      config[cycle] = function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        page.onCycleEvt(cycle)(args);
      };
    }

    // 处理onShareAppMessage
    );if (page.onShareAppMessage) {
      config.onShareAppMessage = function () {
        return page.constructor.prototype['onShareAppMessage'].call(page, page.$queryParams);
      };
    }

    page.$wxapp = getApp();

    comsBind(config, page, '');

    return config;
  },
  PageClass: _PageClass2.default
};