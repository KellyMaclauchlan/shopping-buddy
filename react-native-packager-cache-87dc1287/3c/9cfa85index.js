
var createWrapper = require('lodash._createwrapper'),
    reNative = require('lodash._renative'),
    slice = require('lodash._slice');

function bind(func, thisArg) {
  return arguments.length > 2 ? createWrapper(func, 17, slice(arguments, 2), null, thisArg) : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;