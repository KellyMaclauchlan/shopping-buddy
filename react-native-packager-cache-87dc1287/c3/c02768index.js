
var reNative = require('lodash._renative');

var reThis = /\bthis\b/;

var support = {};

support.funcDecomp = !reNative.test(global.WinRTError) && reThis.test(function () {
  return this;
});

support.funcNames = typeof Function.name == 'string';

module.exports = support;