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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SayHi = {
    _bind: {},
    _event: {},
    props: {
        name: {
            type: String,
            default: 'jack'
        },
        content: {
            type: String,
            default: 'Hello!'
        }
    },
    data: function data() {
        return {
            ref: this.content,
            counter: 0
        };
    },

    methods: {
        showContent: function showContent(e) {
            console.log(this.ref);
        },
        increment: function increment(e) {
            ++this.counter;
            this.$emit('increment', this.counter);
        }
    },
    onLoad: function onLoad() {
        this.$on('increment', function (data) {
            console.log('child increment: ', data);
        });
        console.log('sayHi onLoad!', this.content);
    }
};

var SayHi = function (_core$PageClass) {
    (0, _inherits3.default)(SayHi, _core$PageClass);

    function SayHi() {
        (0, _classCallCheck3.default)(this, SayHi);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SayHi.__proto__ || (0, _getPrototypeOf2.default)(SayHi)).call(this));

        _this.isComponent = true;
        return _this;
    }

    return SayHi;
}(_wcf2.default.PageClass);

_SayHi.constructor = SayHi;
(0, _assign2.default)(SayHi.prototype, _SayHi);

exports.default = SayHi;