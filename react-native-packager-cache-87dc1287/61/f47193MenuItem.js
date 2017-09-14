Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/MenuItem.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var MenuIcon = function (_React$Component) {
  babelHelpers.inherits(MenuIcon, _React$Component);

  function MenuIcon() {
    babelHelpers.classCallCheck(this, MenuIcon);
    return babelHelpers.possibleConstructorReturn(this, (MenuIcon.__proto__ || Object.getPrototypeOf(MenuIcon)).apply(this, arguments));
  }

  babelHelpers.createClass(MenuIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.TouchableHighlight,
        { onPress: this.props.onPress, __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 9
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: { width: 110, height: 110 }, source: this.props.image, __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          })
        )
      );
    }
  }]);
  return MenuIcon;
}(_react2.default.Component);

exports.default = MenuIcon;

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});