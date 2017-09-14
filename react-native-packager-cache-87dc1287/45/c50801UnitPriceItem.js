Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/UnitPriceItem.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _lodash = require('lodash');

var _lodash2 = babelHelpers.interopRequireDefault(_lodash);

var remove_img = require('../icons/remove.png');
var cart_img = require('../icons/cart.png');

var itemStyle = {
  marginVertical: 20,
  height: 200,
  borderColor: '#bbb',
  backgroundColor: window.blue,
  borderWidth: 1,
  paddingHorizontal: 20,
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
  height: 35,
  width: 70
};

var UnitPriceItem = function (_React$Component) {
  babelHelpers.inherits(UnitPriceItem, _React$Component);

  function UnitPriceItem(props) {
    babelHelpers.classCallCheck(this, UnitPriceItem);

    var _this = babelHelpers.possibleConstructorReturn(this, (UnitPriceItem.__proto__ || Object.getPrototypeOf(UnitPriceItem)).call(this, props));

    _this.state = {
      rightText: '',
      leftText: '',
      endText: ''
    };
    return _this;
  }

  babelHelpers.createClass(UnitPriceItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: itemStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 44
              }
            },
            'Name:'
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            placeholder: 'item 1',
            value: this.state.leftText,
            onChangeText: function onChangeText(text) {
              _this2.setState({ leftText: text });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 45
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 55
              }
            },
            'Price:'
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            placeholder: '0.00',
            value: this.state.endText,
            onChangeText: function onChangeText(text) {
              _this2.setState({ endText: text });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 65
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 66
              }
            },
            'Size:'
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            placeholder: '1',
            value: this.state.rightText,
            onChangeText: function onChangeText(text) {
              _this2.setState({ rightText: text });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            }
          }),
          _react2.default.createElement(
            _reactNative.Text,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 75
              }
            },
            'Unit'
          )
        )
      );
    }
  }]);
  return UnitPriceItem;
}(_react2.default.Component);

exports.default = UnitPriceItem;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});