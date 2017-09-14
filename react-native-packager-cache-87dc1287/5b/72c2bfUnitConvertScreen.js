Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/UnitConvertScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var convert = require('convert-units');
var itemStyle = {
  marginVertical: 10,
  height: 60,
  borderColor: '#bbb',
  backgroundColor: '#fefefe',
  borderWidth: 1,
  justifyContent: 'space-between'
};
var inputStyle = {
  backgroundColor: '#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height: 25,
  width: 50,
  marginHorizontal: 5
};
var textStyle = {
  fontSize: 18
};
var itemS = {
  flexDirection: 'column',
  marginVertical: 10,
  backgroundColor: "#7cbab2",
  width: 130,
  borderRadius: 10,
  borderWidth: 1,
  overflow: 'hidden' };
var UnitConvertScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(UnitConvertScreen, _React$Component);

  function UnitConvertScreen() {
    babelHelpers.classCallCheck(this, UnitConvertScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (UnitConvertScreen.__proto__ || Object.getPrototypeOf(UnitConvertScreen)).call(this));

    _this.state = {
      unit1: "",
      unit2: "",
      value: 0,
      calculate: false,
      resultText: ''
    };
    return _this;
  }

  babelHelpers.createClass(UnitConvertScreen, [{
    key: 'unitConvert',
    value: function unitConvert(amount, unit1, unit2) {
      var result = "";
      console.log(amount);
      console.log(unit1);
      console.log(unit2);
      try {
        console.log(convert(amount).from(unit1).to(unit2));
        result = convert(amount).from(unit1).to(unit2) + "" + unit2;
      } catch (err) {
        console.log(err);
        result = " an Invalid Conversion";
      }
      return result;
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      var result = this.unitConvert(this.state.value, this.state.unit1.toLowerCase(), this.state.unit2.toLowerCase());
      this.setState({ resultText: "It is:" + result });
      this.setState({ calculate: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 73
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: itemS, __source: {
                fileName: _jsxFileName,
                lineNumber: 75
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'column' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 77
                  }
                },
                'Unit from:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: 'g',
                value: this.state.unit1,
                onChangeText: function onChangeText(text) {
                  _this2.setState({ unit1: text });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 78
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'column' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 89
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 90
                  }
                },
                'Size:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: '1 ',
                value: this.state.value,
                onChangeText: function onChangeText(text) {
                  _this2.setState({ value: text });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                }
              })
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: itemS, __source: {
                fileName: _jsxFileName,
                lineNumber: 102
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              { style: { flexDirection: 'column' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 103
                }
              },
              _react2.default.createElement(
                _reactNative.Text,
                { style: textStyle, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 104
                  }
                },
                'Convert To:'
              ),
              _react2.default.createElement(_reactNative.TextInput, {
                style: inputStyle,
                placeholder: 'kg',
                value: this.state.unit2,
                onChangeText: function onChangeText(text) {
                  _this2.setState({ unit2: text });
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 105
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { onPress: function onPress() {
              return _this2.calculate();
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 118
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: { alignItems: 'center' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 119
              }
            },
            _react2.default.createElement(_reactNative.Image, { style: styles.button, source: require("./../icons/converticon.png"), __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              }
            })
          )
        ),
        this.state.calculate ? _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 125
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 25, paddingVertical: 10 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 126
              }
            },
            this.state.resultText
          )
        ) : null
      );
    }
  }]);
  return UnitConvertScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Unit Price Calculator',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = UnitConvertScreen;

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});