var metric, imperial;

metric = {
  C: {
    name: {
      singular: 'degree Celsius',
      plural: 'degrees Celsius'
    },
    to_anchor: 1,
    anchor_shift: 0
  },
  K: {
    name: {
      singular: 'degree Kelvin',
      plural: 'degrees Kelvin'
    },
    to_anchor: 1,
    anchor_shift: 273.15
  }
};

imperial = {
  F: {
    name: {
      singular: 'degree Fahrenheit',
      plural: 'degrees Fahrenheit'
    },
    to_anchor: 1
  }
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'C',
      transform: function transform(C) {
        return C / (5 / 9) + 32;
      }
    },
    imperial: {
      unit: 'F',
      transform: function transform(F) {
        return (F - 32) * (5 / 9);
      }
    }
  }
};