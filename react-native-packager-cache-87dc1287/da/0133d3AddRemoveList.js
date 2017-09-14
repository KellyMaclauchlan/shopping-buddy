Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddRemoveList = undefined;
var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/AddRemoveList.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _ = require('lodash');

var TodoRect = function TodoRect(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    _reactNative.View,
    { style: ItemStyle, __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      }
    },
    children
  );
};
var colours = { blue: "#7cbab2",
  darkGrey: '#b0b7b6',
  black: '#030312',
  lightGrey: '#c5cbd3',
  purple: '#310a31',
  warmPurple: '#432043' };

var ItemStyle = {
  marginVertical: 0,
  height: 60,
  paddingHorizontal: 20,
  paddingVertical: 10
};

var AddRemoveList = exports.AddRemoveList = function (_React$Component) {
  babelHelpers.inherits(AddRemoveList, _React$Component);

  function AddRemoveList() {
    babelHelpers.classCallCheck(this, AddRemoveList);

    var _this = babelHelpers.possibleConstructorReturn(this, (AddRemoveList.__proto__ || Object.getPrototypeOf(AddRemoveList)).call(this));

    _this.state = {
      add_item_text: null
    };
    return _this;
  }

  babelHelpers.createClass(AddRemoveList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          onDismissItem = _props.onDismissItem,
          onClickItem = _props.onClickItem;
      var add_item_text = this.state.add_item_text;


      return _react2.default.createElement(
        _reactNative.View,
        {
          style: {
            paddingHorizontal: 25,
            paddingVertical: 15
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 61
          }
        },
        _react2.default.createElement(_reactNative.TextInput, {
          placeholder: 'Add an item',
          placeholderTextColor: '#999',
          value: add_item_text,
          style: _.merge({
            borderColor: '#bbb',
            backgroundColor: '#fefefe',
            borderRadius: 10,
            borderWidth: 1,
            overflow: 'hidden',
            paddingVertical: 15
          }, ItemStyle),
          onChangeText: function onChangeText(text) {
            return _this2.setState({ add_item_text: text });
          },
          onKeyPress: function onKeyPress(event) {
            if (event.nativeEvent.key == 'Enter' && !_.isEmpty(add_item_text)) {
              _this2.addItem(add_item_text);2;
            }
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          }
        }),
        _react2.default.createElement(
          _reactNative.ScrollView,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 86
            }
          },
          _react2.default.createElement(_reactNative.FlatList, {
            data: items,
            renderItem: function renderItem(_ref2) {
              var item = _ref2.item;
              return _react2.default.createElement(
                TodoRect,
                { key: item.text, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 90
                  }
                },
                _react2.default.createElement(
                  _reactNative.View,
                  { style: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    },
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 91
                    }
                  },
                  _react2.default.createElement(
                    _reactNative.View,
                    { style: {
                        flexGrow: 1,
                        marginRight: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        overflow: 'hidden',
                        backgroundColor: window.blue
                      }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 97
                      }
                    },
                    _react2.default.createElement(_reactNative.Text, {
                      onPress: function onPress() {
                        return onClickItem(item);
                      },
                      children: item.text,
                      style: { fontSize: 18, color: 'white', textAlign: 'center' },
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 107
                      }
                    })
                  ),
                  _react2.default.createElement(
                    _reactNative.View,
                    {
                      style: {
                        backgroundColor: window.black,
                        borderRadius: 40,
                        borderWidth: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexGrow: 0

                      },

                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 113
                      }
                    },
                    _react2.default.createElement(_reactNative.Text, {
                      onPress: function onPress() {
                        return onDismissItem(item);
                      },
                      children: " X ",
                      style: { fontSize: 25, color: 'white' },
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 127
                      }
                    })
                  )
                )
              );
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 87
            }
          })
        )
      );
    }
  }, {
    key: 'addItem',
    value: function addItem(item_text) {
      this.props.onAddItem(item_text);
      this.setState({
        add_item_text: null
      });
    }
  }]);
  return AddRemoveList;
}(_react2.default.Component);