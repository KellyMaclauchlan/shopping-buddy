'use strict';

var alphabet = require('./alphabet');
var encode = require('./encode');
var decode = require('./decode');
var build = require('./build');
var isValid = require('./is-valid');

var clusterWorkerId = require('./util/cluster-worker-id') || 0;

function seed(seedValue) {
  alphabet.seed(seedValue);
  return module.exports;
}

function worker(workerId) {
  clusterWorkerId = workerId;
  return module.exports;
}

function characters(newCharacters) {
  if (newCharacters !== undefined) {
    alphabet.characters(newCharacters);
  }

  return alphabet.shuffled();
}

function generate() {
  return build(clusterWorkerId);
}

module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;