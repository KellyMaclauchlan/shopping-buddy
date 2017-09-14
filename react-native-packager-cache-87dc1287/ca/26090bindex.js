
var noop = require('lodash.noop'),
    reNative = require('lodash._renative');

var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

var defineProperty = function () {
  try {
    var o = {},
        func = reNative.test(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch (e) {}
  return result;
}();

var setBindData = !defineProperty ? noop : function (func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;