Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/UnitPriceScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _UnitPriceItem = require('./UnitPriceItem');

var _UnitPriceItem2 = babelHelpers.interopRequireDefault(_UnitPriceItem);

var convert = require('convert-units');

var inputStyle = {
  backgroundColor: '#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height: 25,
  width: 70,
  marginHorizontal: 5
};
var textStyle = {
  fontSize: 18
};
var colours = { blue: "#7cbab2",
  darkGrey: '#b0b7b6',
  black: '#030312',
  lightGrey: '#c5cbd3',
  purple: '#310a31',
  warmPurple: '#432043' };
var itemS = {
  flexDirection: 'column',
  marginVertical: 10,
  backgroundColor: "#7cbab2",
  width: 130,
  borderRadius: 10,
  borderWidth: 1,
  overflow: 'hidden' };

var unitPriceScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(unitPriceScreen, _React$Component);

  function unitPriceScreen() {
    babelHelpers.classCallCheck(this, unitPriceScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (unitPriceScreen.__proto__ || Object.getPrototypeOf(unitPriceScreen)).call(this));

    _this.state = {
      item1: { name: "Item 1:", price: "0.00", size: "1", unit: "g" },
      item2: { name: "Item 2:", price: "1.00", size: "1", unit: "g" },
      compared: false,
      resultText: ''
    };
    return _this;
  }

  babelHelpers.createClass(unitPriceScreen, [{
    key: 'compare',
    value: function compare(item1, item2) {
      var val1 = item1.size;
      var unit1 = item1.unit;
      var price1 = item1.price;
      var val2 = item2.size;
      var unit2 = item2.unit;
      var price2 = item2.price;
      var val1Convert;
      try {
        val1Convert = convert(val1).from(unit1).to(unit2);
      } catch (err) {
        return "Units cannot be compaired";
      }
      console.log("run again");
      var unitPrice1 = price1 / val1Convert;
      var unitPrice2 = price2 / val2;
      if (unitPrice1 < unitPrice2) {
        return "Item 1 has a better price";
      } else if (unitPrice2 < unitPrice1) {
        return "Item 2 has a better price";
      } else {
        return "They are the same price";
      }
    }
  }, {
    key: 'convert',
    value: function convert() {
      var result = this.compare(this.state.item1, this.state.item2);
      this.setState({ resultText: result });
      this.setState({ compared: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 91
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 92
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: itemS, __source: {
                fileName: _jsxFileName,
                lineNumber: 93
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: textStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 94
                }
              },
              'Item 1'
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 95
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                  }
                },
                'Price:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: '0.00',
                value: this.state.item1.price,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item1;
                  ite.price = text;
                  _this2.setState({ item1: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 97
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 111
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 112
                  }
                },
                ' Size:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: '1',
                value: this.state.item1.size,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item1;
                  ite.size = text;
                  _this2.setState({ item1: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 113
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 126
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 127
                  }
                },
                ' Unit:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: 'g',
                value: this.state.item1.unit,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item1;
                  ite.unit = text;
                  _this2.setState({ item1: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 128
                }
              })
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: itemS, __source: {
                fileName: _jsxFileName,
                lineNumber: 142
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: textStyle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 143
                }
              },
              'Item 2'
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 144
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 145
                  }
                },
                'Price:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: '0.00',
                value: this.state.item2.price,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item2;
                  ite.price = text;
                  _this2.setState({ item2: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 146
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 160
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 161
                  }
                },
                ' Size:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: '1',
                value: this.state.item2.size,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item2;
                  ite.size = text;
                  _this2.setState({ item2: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 162
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'row' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 175
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 176
                  }
                },
                ' Unit:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: 'g',
                value: this.state.item2.unit,
                onChangeText: function onChangeText(text) {
                  var ite;
                  ite = _this2.state.item2;
                  ite.unit = text;
                  _this2.setState({ item2: ite });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 177
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { onPress: function onPress() {
              return _this2.convert();
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 193
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: { alignItems: 'center' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 194
              }
            },
            _react2.default.createElement(_reactNative.Image, { style: styles.button, source: require("./../icons/scaleicon.png"), __source: {
                fileName: _jsxFileName,
                lineNumber: 195
              }
            })
          )
        ),
        this.state.compared ? _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 200
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 25, paddingVertical: 10 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 201
              }
            },
            this.state.resultText
          )
        ) : null
      );
    }
  }]);
  return unitPriceScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Unit Price Calculator',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = unitPriceScreen;

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});