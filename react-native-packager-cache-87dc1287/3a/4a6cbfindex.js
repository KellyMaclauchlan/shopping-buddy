
var isObject = require('lodash.isobject'),
    reNative = require('lodash._renative'),
    shimKeys = require('lodash._shimkeys');

var nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys;

var keys = !nativeKeys ? shimKeys : function (object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;