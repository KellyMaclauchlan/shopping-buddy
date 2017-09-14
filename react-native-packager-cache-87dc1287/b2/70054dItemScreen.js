Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemScreen = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/ItemScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _reactNativeDatepicker = require('react-native-datepicker');

var _reactNativeDatepicker2 = babelHelpers.interopRequireDefault(_reactNativeDatepicker);

var _reactNativeKeyboardAwareScrollView = require('react-native-keyboard-aware-scroll-view');

var _ = require('lodash');

var inputStyle = {
  backgroundColor: '#fefefe',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#999',
  borderWidth: 1,
  display: 'block',
  fontSize: 18,
  height: 35
};

var ItemStyle = {
  marginVertical: 20,
  display: 'flex',
  flexDirection: 'column'
};

var input_header_style = {
  fontWeight: 'bold',
  fontSize: 20
};

var ItemScreen = exports.ItemScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(ItemScreen, _React$Component);

  function ItemScreen(props) {
    babelHelpers.classCallCheck(this, ItemScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (ItemScreen.__proto__ || Object.getPrototypeOf(ItemScreen)).call(this, props));

    console.log(props);
    _this.state = {
      item: props["item"],
      visibleHeight: _reactNative.Dimensions.get('window').height
    };
    return _this;
  }

  babelHelpers.createClass(ItemScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.keyboardDidShowListener = _reactNative.Keyboard.addListener('keyboardDidShow', function (e) {
        return _this2._keyboardDidShow(e);
      });
      this.keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', function (e) {
        return _this2._keyboardDidHide(e);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }, {
    key: '_keyboardDidShow',
    value: function _keyboardDidShow(e) {
      var visibleHeight = _reactNative.Dimensions.get('window').height - e.endCoordinates.height;
      _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.create(e.duration, _reactNative.LayoutAnimation.Types[e.easing]));
      this.setState({ visibleHeight: visibleHeight });
    }
  }, {
    key: '_keyboardDidHide',
    value: function _keyboardDidHide(e) {
      var visibleHeight = _reactNative.Dimensions.get('window').height;
      this.setState({ visibleHeight: visibleHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var onSave = this.props.onSave;

      var item = this.state.item;
      var visibleHeight = this.state.visibleHeight;
      console.log(visibleHeight);
      var expire = item.expiryDate;
      if (expire === undefined) {
        expire = "";
      }
      var notes = item.notes;
      if (notes === undefined) {
        notes = "";
      }
      var pantryLocation = "Pantry Location:";
      console.log("here");
      return _react2.default.createElement(
        _reactNativeKeyboardAwareScrollView.KeyboardAwareScrollView,
        {
          style: { flex: 1, backgroundColor: window.darkGrey },
          resetScrollToCoords: { x: 0, y: 0 },
          scrollEnabled: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 131
            }
          },
          _react2.default.createElement(_reactNativeElements.Button, {
            onPress: function onPress() {
              return onSave(item);
            },
            buttonStyle: { backgroundColor: window.warmPurple, borderRadius: 10, overflow: 'hidden' },
            textStyle: { textAlign: 'center' },
            title: 'Save',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 132
            }
          }),
          _react2.default.createElement(
            _reactNative.Text,
            { style: input_header_style, __source: {
                fileName: _jsxFileName,
                lineNumber: 139
              }
            },
            ' Name '
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            value: this.state.item.text,
            onChangeText: function onChangeText(text) {
              var ite;
              ite = _this3.state.item;
              ite.name = text;
              _this3.setState({ item: ite });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            }
          })
        ),
        item.pantryLocation ? _react2.default.createElement(
          _reactNative.View,
          { style: ItemStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 154
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: input_header_style, __source: {
                fileName: _jsxFileName,
                lineNumber: 155
              }
            },
            ' Pantry Location '
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            value: this.state.item.pantryLocation + "",
            onChangeText: function onChangeText(text) {
              var ite;
              ite = _this3.state.item;
              ite.pantryLocation = text;
              _this3.setState({ item: ite });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 156
            }
          })
        ) : null,
        _react2.default.createElement(
          _reactNative.View,
          { style: ItemStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 169
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: input_header_style, __source: {
                fileName: _jsxFileName,
                lineNumber: 170
              }
            },
            ' Quantity '
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: inputStyle,
            value: this.state.item.quantity + "",
            onChangeText: function onChangeText(text) {
              var ite;
              ite = _this3.state.item;
              ite.quantity = text;
              _this3.setState({ item: ite });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 171
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: ItemStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 182
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: input_header_style, __source: {
                fileName: _jsxFileName,
                lineNumber: 183
              }
            },
            ' Expire Date '
          ),
          _react2.default.createElement(_reactNativeDatepicker2.default, {
            style: { width: 320 },
            date: expire,
            mode: 'date',
            placeholder: 'select date',
            format: 'YYYY-MM-DD',
            minDate: '2017-05-01',
            maxDate: '2022-06-01',
            confirmBtnText: 'Confirm',
            cancelBtnText: 'Cancel',
            customStyles: {
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                backgroundColor: '#fefefe',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#999',
                borderWidth: 1,
                display: 'block',
                fontSize: 18,
                height: 45,
                overflow: 'hidden',
                width: 200
              }
            },
            onDateChange: function onDateChange(text) {
              var ite;
              ite = _this3.state.item;
              ite.expiryDate = text;
              _this3.setState({ item: ite });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 184
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: ItemStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 223
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: input_header_style, __source: {
                fileName: _jsxFileName,
                lineNumber: 224
              }
            },
            ' Notes '
          ),
          _react2.default.createElement(_reactNative.TextInput, {
            style: babelHelpers.extends({}, inputStyle, { height: 80 }),
            value: notes,
            multiline: true,
            numberOfLines: 5,
            blurOnSubmit: false,
            onChangeText: function onChangeText(text) {
              var ite;
              ite = _this3.state.item;
              ite.notes = text;
              _this3.setState({ item: ite });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 225
            }
          })
        )
      );
    }
  }]);
  return ItemScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Item'
}, _temp);


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});