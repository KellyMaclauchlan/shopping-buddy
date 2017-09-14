var convert,
    keys = require('lodash.keys'),
    each = require('lodash.foreach'),
    measures = {
  length: require('./definitions/length'),
  area: require('./definitions/area'),
  mass: require('./definitions/mass'),
  volume: require('./definitions/volume'),
  each: require('./definitions/each'),
  temperature: require('./definitions/temperature'),
  time: require('./definitions/time'),
  digital: require('./definitions/digital'),
  partsPer: require('./definitions/partsPer'),
  speed: require('./definitions/speed'),
  pressure: require('./definitions/pressure'),
  current: require('./definitions/current'),
  voltage: require('./definitions/voltage'),
  power: require('./definitions/power'),
  reactivePower: require('./definitions/reactivePower'),
  apparentPower: require('./definitions/apparentPower'),
  energy: require('./definitions/energy'),
  reactiveEnergy: require('./definitions/reactiveEnergy'),
  volumeFlowRate: require('./definitions/volumeFlowRate')
},
    Converter;

Converter = function Converter(numerator, denominator) {
  if (denominator) this.val = numerator / denominator;else this.val = numerator;
};

Converter.prototype.from = function (from) {
  if (this.destination) throw new Error('.from must be called before .to');

  this.origin = this.getUnit(from);

  if (!this.origin) {
    this.throwUnsupportedUnitError(from);
  }

  return this;
};

Converter.prototype.to = function (to) {
  if (!this.origin) throw new Error('.to must be called after .from');

  this.destination = this.getUnit(to);

  var result, transform;

  if (!this.destination) {
    this.throwUnsupportedUnitError(to);
  }

  if (this.origin.abbr === this.destination.abbr) {
    return this.val;
  }

  if (this.destination.measure != this.origin.measure) {
    throw new Error('Cannot convert incompatible measures of ' + this.destination.measure + ' and ' + this.origin.measure);
  }

  result = this.val * this.origin.unit.to_anchor;

  if (this.destination.unit.anchor_shift) {
    result += this.destination.unit.anchor_shift;
  }

  if (this.origin.unit.anchor_shift) {
    result -= this.origin.unit.anchor_shift;
  }

  if (this.origin.system != this.destination.system) {
    transform = measures[this.origin.measure]._anchors[this.origin.system].transform;
    if (typeof transform === 'function') {
      return result = transform(result);
    }
    result *= measures[this.origin.measure]._anchors[this.origin.system].ratio;
  }

  return result / this.destination.unit.to_anchor;
};

Converter.prototype.toBest = function (options) {
  if (!this.origin) throw new Error('.toBest must be called after .from');

  if (options == null) {
    options = { exclude: [] };
  }

  var best;

  each(this.possibilities(), function (possibility) {
    var unit = this.describe(possibility);
    var isIncluded = options.exclude.indexOf(possibility) === -1;

    if (isIncluded && unit.system === this.origin.system) {
      var result = this.to(possibility);
      if (!best || result >= 1 && result < best.val) {
        best = {
          val: result,
          unit: possibility,
          singular: unit.singular,
          plural: unit.plural
        };
      }
    }
  }.bind(this));

  return best;
};

Converter.prototype.getUnit = function (abbr) {
  var found;

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if (system == '_anchors') return false;

      each(units, function (unit, testAbbr) {
        if (testAbbr == abbr) {
          found = {
            abbr: abbr,
            measure: measure,
            system: system,
            unit: unit
          };
          return false;
        }
      });

      if (found) return false;
    });

    if (found) return false;
  });

  return found;
};

var describe = function describe(resp) {
  return {
    abbr: resp.abbr,
    measure: resp.measure,
    system: resp.system,
    singular: resp.unit.name.singular,
    plural: resp.unit.name.plural
  };
};

Converter.prototype.describe = function (abbr) {
  var resp = Converter.prototype.getUnit(abbr);
  var desc = null;

  try {
    desc = describe(resp);
  } catch (err) {
    this.throwUnsupportedUnitError(abbr);
  }

  return desc;
};

Converter.prototype.list = function (measure) {
  var list = [];

  each(measures, function (systems, testMeasure) {
    if (measure && measure !== testMeasure) return;

    each(systems, function (units, system) {
      if (system == '_anchors') return false;

      each(units, function (unit, abbr) {
        list = list.concat(describe({
          abbr: abbr,
          measure: testMeasure,
          system: system,
          unit: unit
        }));
      });
    });
  });

  return list;
};

Converter.prototype.throwUnsupportedUnitError = function (what) {
  var validUnits = [];

  each(measures, function (systems, measure) {
    each(systems, function (units, system) {
      if (system == '_anchors') return false;

      validUnits = validUnits.concat(keys(units));
    });
  });

  throw new Error('Unsupported unit ' + what + ', use one of: ' + validUnits.join(', '));
};

Converter.prototype.possibilities = function (measure) {
  var possibilities = [];
  if (!this.origin && !measure) {
    each(keys(measures), function (measure) {
      each(measures[measure], function (units, system) {
        if (system == '_anchors') return false;

        possibilities = possibilities.concat(keys(units));
      });
    });
  } else {
    measure = measure || this.origin.measure;
    each(measures[measure], function (units, system) {
      if (system == '_anchors') return false;

      possibilities = possibilities.concat(keys(units));
    });
  }

  return possibilities;
};

Converter.prototype.measures = function () {
  return keys(measures);
};

convert = function convert(value) {
  return new Converter(value);
};

module.exports = convert;