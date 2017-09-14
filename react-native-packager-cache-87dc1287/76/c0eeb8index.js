
var baseBind = require('lodash._basebind'),
    baseCreateWrapper = require('lodash._basecreatewrapper'),
    isFunction = require('lodash.isfunction');

var arrayRef = [];

var push = arrayRef.push;

function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError();
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    bindData = bindData.slice();

    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }

    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }

    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }

    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }

    if (isPartialRight) {
      push.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }

    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }

  var creater = bitmask == 1 || bitmask === 17 ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;