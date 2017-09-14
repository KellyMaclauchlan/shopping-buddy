Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/ListItem.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var remove_img = require('../icons/remove.png');
var cart_img = require('../icons/cart.png');
var ItemStyle = {
  marginVertical: 0,
  height: 60,
  borderColor: window.darkGrey,
  backgroundColor: window.darkGrey,
  borderWidth: 0,
  paddingHorizontal: 20,
  paddingVertical: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

var ListItem = function (_React$Component) {
  babelHelpers.inherits(ListItem, _React$Component);

  function ListItem() {
    babelHelpers.classCallCheck(this, ListItem);
    return babelHelpers.possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  babelHelpers.createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactNative.View,
        { style: ItemStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          }
        },
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { onPress: function onPress() {
              return _this2.props.remove(_this2.props.item);
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: styles.button, source: remove_img, __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { onPress: function onPress() {
              return _this2.props.seeItem(_this2.props.item);
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 16, backgroundColor: '#7CBAB2', width: 200, textAlign: 'center', borderRadius: 10, paddingVertical: 10, borderWidth: 1, overflow: 'hidden' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              }
            },
            this.props.item.text
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableHighlight,
          { onPress: function onPress() {
              return _this2.props.addToCart(_this2.props.item);
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: styles.button, source: cart_img, __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            }
          })
        )
      );
    }
  }]);
  return ListItem;
}(_react2.default.Component);

exports.default = ListItem;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});