
var bind = require('lodash.bind'),
    identity = require('lodash.identity'),
    setBindData = require('lodash._setbinddata'),
    support = require('lodash.support');

var reFuncName = /^\s*function[ \n\r\t]+\w/;

var reThis = /\bthis\b/;

var fnToString = Function.prototype.toString;

function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }

  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }

  if (bindData === false || bindData !== true && bindData[1] & 1) {
    return func;
  }
  switch (argCount) {
    case 1:
      return function (value) {
        return func.call(thisArg, value);
      };
    case 2:
      return function (a, b) {
        return func.call(thisArg, a, b);
      };
    case 3:
      return function (value, index, collection) {
        return func.call(thisArg, value, index, collection);
      };
    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;