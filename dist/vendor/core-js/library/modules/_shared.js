var _global = require('./_global.js');
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};
