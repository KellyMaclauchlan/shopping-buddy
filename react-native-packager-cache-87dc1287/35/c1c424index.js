
var objectTypes = require('lodash._objecttypes');

function isObject(value) {
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;