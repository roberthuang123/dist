'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('../babel-runtime/helpers/defineProperty.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _defineProperty4 = require('../babel-runtime/core-js/object/define-property.js');

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('../babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getOwnPropertyNames = require('../babel-runtime/core-js/object/get-own-property-names.js');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Props = {
  checkType: function checkType(val, t) {
    switch (t) {
      case String:
        return typeof val === 'string';
      case Number:
        return typeof val === 'number';
      case Boolean:
        return typeof val === 'boolean';
      case Function:
        return typeof val === 'function';
      case Object:
        return (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object';
      case Array:
        return toString.call(val) === '[object Array]';
      default:
        return val instanceof t;
    }
  },
  build: function build(props) {
    var rst = {};
    if (props instanceof Array) {
      // 只是简单的申明几个属性的情况
      props.forEach(function (name) {
        rst[name] = {};
      });
    } else if (props instanceof Object) {
      (0, _getOwnPropertyNames2.default)(props).forEach(function (name) {
        var val = props[name];
        var prop = {};

        if (typeof val === 'function') {
          // 只做单类型验证
          prop.type = [val];
        } else if (val instanceof Array) {
          // 做多类型验证
          prop.type = val;
        } else {
          prop = val;
        }
        if (prop.type && !(prop.type instanceof Array)) {
          prop.type = [prop.type];
        }
        rst[name] = prop;
      });
    }
    return rst;
  },
  valid: function valid(props, key, val) {
    var _this = this;

    var rst = false;
    if (props[key]) {
      if (!props[key].type) {
        rst = true;
      } else {
        rst = props[key].type.some(function (t) {
          return _this.checkType(val, t);
        });
      }
      // 增加对自定义验证函数的支持
      if (props[key].validator && typeof props[key].validator === 'function') {
        rst = props[key].validator(val);
      }
    }
    return rst;
  },
  getValue: function getValue(props, key, val) {
    var rst = void 0;
    var prop = props[key];

    if (prop) {
      if (val !== undefined && this.valid(props, key, val)) {
        // 验证通过
        rst = val;
      } else if (typeof prop.default === 'function') {
        rst = prop.default();
      } else {
        rst = prop.default;
      }
    }
    return rst;
  },
  parseValue: function parseValue(propType, val) {
    var rst = void 0;
    if (propType === Object || propType === Array) {
      rst = JSON.parse(val);
    } else if (propType === Boolean) {
      rst = val !== 'false';
    } else {
      rst = propType(val);
    }
    return rst;
  }
};

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  (0, _createClass3.default)(_class, [{
    key: 'init',
    value: function init($wxpage, $parent, $root) {

      var com = this;
      var defaultData = {};
      var datas = [];
      var watchs = [];
      var computeds = (0, _getOwnPropertyNames2.default)(com.computed || {});

      com.$wxpage = $wxpage;
      com.$root = $root;
      com.$parent = $parent;
      com.$children = [];
      com.$events = {};

      // 处理props
      com.$props = Props.build(com.props);
      (0, _keys2.default)(com.$props).forEach(function (key) {
        var mappingName = void 0;
        var mappingVal = void 0;

        if (com.$parent._bind && com.$parent._bind[com.$name]) {
          mappingName = com.$parent._bind[com.$name][key] && com.$parent._bind[com.$name][key].key;
        }

        // 增加对直接传字面量参数的支持
        if (com.$parent[mappingName] === undefined && mappingName) {
          var propType = com.$props[key] && com.$props[key].type[0];
          if (propType) {
            mappingVal = Props.parseValue(propType, mappingName);
          }
        } else {
          mappingVal = com.$parent[mappingName];
        }

        mappingVal = Props.getValue(com.$props, key, mappingVal);
        defaultData['' + com.$prefix + key] = mappingVal;
        com[key] = mappingVal;
      });

      com.$data = _utils2.default.$copy(com.data && com.data.call(com) || {}

      // 进一步处理data
      );datas = (0, _getOwnPropertyNames2.default)(com.$data || {});
      datas.forEach(function (name) {
        defaultData['' + com.$prefix + name] = com.$data[name];
        (0, _defineProperty5.default)(com, name, {
          configurable: true,
          get: function get() {
            return com.$data[name];
          },
          set: function set(val) {
            var _this2 = this;

            var oldVal = com.$data[name];

            // TODO: 脏数据检查，为改变的数据不进行设置
            // if (val === oldVal) return

            // 设置数据
            com.$data[name] = val = _utils2.default.$copy(val);
            com.setData((0, _defineProperty3.default)({}, '' + com.$prefix + name, val)

            // 通知watch
            );watchs = com.watch || [];
            watchs.hasOwnProperty(name) && watchs[name].call(com, val, oldVal

            // 重新计算computed属性
            );computeds.forEach(function (name) {
              var getter = com.computed[name].get || com.computed[name].set && noop || com.computed[name];
              var v = getter.call(com);
              com.setData((0, _defineProperty3.default)({}, '' + com.$prefix + name, v));
              com.$data[name] = _utils2.default.$copy(v);
            }

            // 处理child Props
            );(0, _getOwnPropertyNames2.default)(com._bind || {}).forEach(function (bindCom) {
              _this2._updateChildProps(com.$coms[bindCom], name, val);
            });
          }
        });
      }

      // 映射computed属性
      );computeds.forEach(function (name) {
        // 初始化计算属性
        var getter = com.computed[name].get || com.computed[name].set && noop || com.computed[name];
        defaultData['' + com.$prefix + name] = getter.call(com);
        com.$data[name] = _utils2.default.$copy(defaultData['' + com.$prefix + name]);

        (0, _defineProperty5.default)(com, name, {
          configurable: true,
          set: function set(val) {
            var setter = com.computed[name].set || _utils2.default.$noop;
            setter.call(com, val);
          },
          get: function get() {
            return com.$data[name];
          }
        });
      });

      com.setData(defaultData

      // 初始化子组件
      );(0, _getOwnPropertyNames2.default)(com.$coms || {}).forEach(function (name) {
        var child = com.$coms[name];
        child.init.call(child, com.$wxpage, com, $root);
        com.$children.push(child);
      });
    }
  }, {
    key: 'onLoadEvt',
    value: function onLoadEvt(obj) {
      var _this3 = this;

      this.$queryParams = obj;
      this.onLoad && this.onLoad.call(this, obj);
      (0, _getOwnPropertyNames2.default)(this.$coms || {}).forEach(function (name) {
        var child = _this3.$coms[name];
        child.onLoadEvt(obj);
      });
    }
  }, {
    key: 'onCycleEvt',
    value: function onCycleEvt(cycle) {
      var _this4 = this;

      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this4[cycle] && _this4[cycle].apply(_this4, args);
        (0, _getOwnPropertyNames2.default)(_this4.$coms || {}).forEach(function (name) {
          var child = _this4.$coms[name];
          child.onCycleEvt(cycle)(args);
        });
      };
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.$wxpage.setData(data);
    }
  }, {
    key: '$on',
    value: function $on(eventName, fn) {
      if (!this.$events[eventName]) {
        this.$events[eventName] = [];
      }
      this.$events[eventName].push(fn);
    }
  }, {
    key: '$emit',
    value: function $emit(eventName) {
      var _this5 = this;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      // 调用父组件事件回调
      if (this.$parent._event && this.$parent._event[this.$name]) {
        (0, _keys2.default)(this.$parent._event[this.$name]).forEach(function (e) {
          if (e === eventName) {
            var fn = _this5.$parent._event[_this5.$name][e];
            _this5.$parent[fn].apply(_this5.$parent, args);
          }
        });
      }

      // 调用组件内的事件回调
      if (this.$events[eventName]) {
        this.$events[eventName].forEach(function (fn) {
          fn.apply(_this5, args);
        });
      }
    }
  }, {
    key: '$off',
    value: function $off() {
      var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var fn = arguments[1];

      if (typeof eventName !== 'string') return;
      eventName ? this.$events[eventName] = [] : this.$events = {};
      if (this.$events[eventName] && fn) {
        var index = this.$events[eventName].indexOf(fn);
        this.$events[eventName].splice(index, 1);
      }
    }
  }, {
    key: '$copy',
    value: function $copy() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _utils2.default.$copy.apply(null, args);
    }
  }, {
    key: '_updateChildProps',
    value: function _updateChildProps(child, key, val) {
      var _this6 = this;

      if (!child) return;

      (0, _keys2.default)(this._bind[child.$name]).forEach(function (k) {
        if (_this6._bind[child.$name][k].key === key) {
          key = k;
        }
      });

      var rst = Props.getValue(child.$props, key, val);
      if (child.$props.hasOwnProperty(key)) {
        var oldVal = _utils2.default.$copy(child[key]);

        this.setData((0, _defineProperty3.default)({}, '' + child.$prefix + key, rst));
        child[key] = rst;

        // 通知watch
        var watchs = child.watch || [];
        watchs.hasOwnProperty(key) && watchs[key].call(child, val, oldVal

        // 处理child Props
        );(0, _getOwnPropertyNames2.default)(child._bind || {}).forEach(function (bindCom) {
          child._updateChildProps(child.$coms[bindCom], key, val);
        });
      }
    }
  }]);
  return _class;
}();

exports.default = _class;