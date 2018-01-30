var isObject = require('./_is-object.js');
var _document = require('./_global.js').document;
// typeof _document.createElement is 'object' in old IE
var is = isObject(_document) && isObject(_document.createElement);
module.exports = function (it) {
  return is ? _document.createElement(it) : {};
};
