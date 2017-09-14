
var objectTypes = require('lodash._objecttypes');

var objectProto = Object.prototype;

var hasOwnProperty = objectProto.hasOwnProperty;

var shimKeys = function shimKeys(object) {
  var index,
      iterable = object,
      result = [];
  if (!iterable) return result;
  if (!objectTypes[typeof object]) return result;
  for (index in iterable) {
    if (hasOwnProperty.call(iterable, index)) {
      result.push(index);
    }
  }
  return result;
};

module.exports = shimKeys;