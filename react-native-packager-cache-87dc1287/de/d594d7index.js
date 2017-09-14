
var isObject = require('lodash.isobject'),
    noop = require('lodash.noop'),
    reNative = require('lodash._renative');

var nativeCreate = reNative.test(nativeCreate = Object.create) && nativeCreate;

function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}

if (!nativeCreate) {
  baseCreate = function () {
    function Object() {}
    return function (prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }();
}

module.exports = baseCreate;