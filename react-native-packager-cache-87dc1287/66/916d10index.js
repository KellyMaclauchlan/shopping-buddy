
var objectProto = Object.prototype;

var toString = objectProto.toString;

var reNative = RegExp('^' + String(toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');

module.exports = reNative;