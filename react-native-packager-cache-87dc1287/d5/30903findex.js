
var baseCreateCallback = require('lodash._basecreatecallback'),
    keys = require('lodash.keys'),
    objectTypes = require('lodash._objecttypes');

var forOwn = function forOwn(collection, callback, thisArg) {
  var index,
      iterable = collection,
      result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
  var ownIndex = -1,
      ownProps = objectTypes[typeof iterable] && keys(iterable),
      length = ownProps ? ownProps.length : 0;

  while (++ownIndex < length) {
    index = ownProps[ownIndex];
    if (callback(iterable[index], index, collection) === false) return result;
  }
  return result;
};

module.exports = forOwn;