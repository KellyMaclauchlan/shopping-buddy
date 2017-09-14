Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/RecipeScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _AddRemoveList = require('./AddRemoveList');

var _ = require('lodash');

var colours = { blue: "#7cbab2",
  darkGrey: '#b0b7b6',
  black: '#030312',
  lightGrey: '#c5cbd3',
  purple: '#310a31',
  warmPurple: '#432043' };

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

var RecepieScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(RecepieScreen, _React$Component);

  function RecepieScreen(props) {
    babelHelpers.classCallCheck(this, RecepieScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (RecepieScreen.__proto__ || Object.getPrototypeOf(RecepieScreen)).call(this, props));

    _this.state = {
      items: [],
      showRecipie: false,
      selectedIndex: 0,
      isSaving: false,
      isLoading: true,
      selectedItem: null
    };
    return _this;
  }

  babelHelpers.createClass(RecepieScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _reactNative.AsyncStorage.multiGet(['recipeList']).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 1),
            _results$ = babelHelpers.slicedToArray(_results[0], 2),
            k1 = _results$[0],
            recipe_json = _results$[1];

        var list = JSON.parse(recipe_json);

        _this2.setState({
          items: list,
          isLoading: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          items = _state.items,
          showRecipie = _state.showRecipie;

      if (this.state.isSaving || this.state.isLoading) {
        return _react2.default.createElement(
          _reactNative.Text,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 93
            }
          },
          ' Loading... '
        );
      }
      return _react2.default.createElement(
        _reactNative.View,
        { style: { backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        },
        !showRecipie ? _react2.default.createElement(_AddRemoveList.AddRemoveList, {
          onAddItem: function onAddItem(new_item) {
            var item = { text: new_item, time: "", ovenSetting: "", steps: "", ingrediants: "", id: window.kelly_uID() };

            ites = _this3.state.items.concat([item]);
            _this3.setState({
              items: ites,
              selectedIndex: items.indexOf(item),
              showRecipie: true,
              selectedItem: item
            });
            _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(ites)]]).then(function () {
              _this3.setState({
                isSaving: false
              });
            });
          },

          onDismissItem: function onDismissItem(_ref) {
            var id = _ref.id;
            var items = _this3.state.items;

            _this3.setState({ isSaving: true });
            _this3.setState({
              items: _.reject(items, { id: id })
            });
            _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
              _this3.setState({
                isSaving: false
              });
            });
          },
          items: items,
          onClickItem: function onClickItem(_ref2) {
            var id = _ref2.id;
            var items = _this3.state.items;

            _this3.setState({
              selectedItem: id,
              selectedIndex: items.indexOf(id),
              showRecipie: true
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          }
        }) : _react2.default.createElement(
          _reactNative.ScrollView,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 139
            }
          },
          _react2.default.createElement(_reactNative.Button, {
            title: 'Back',
            onPress: function onPress() {
              return _this3.setState({
                showRecipie: false
              });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            }
          }),
          _react2.default.createElement(
            _reactNative.View,
            { style: ItemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 147
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: input_header_style, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 148
                }
              },
              ' Name '
            ),
            _react2.default.createElement(_reactNative.TextInput, {
              style: inputStyle,
              value: this.state.selectedItem.text,
              onChangeText: function onChangeText(text) {
                _this3.setState({ isSaving: true });
                var ite;
                ite = _this3.state.selectedItem;
                ite.text = text;
                _this3.setState({ selectedItem: ite });
                var itel;
                itel = _this3.state.items;
                itel[_this3.state.selectedIndex] = ite;
                _this3.setState({ items: itel });
                _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
                  _this3.setState({
                    isSaving: false
                  });
                });
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 149
              }
            })
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: ItemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 171
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: input_header_style, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 172
                }
              },
              ' Cook Time '
            ),
            _react2.default.createElement(_reactNative.TextInput, {
              style: inputStyle,
              value: this.state.selectedItem.cook,
              onChangeText: function onChangeText(text) {
                _this3.setState({ isSaving: true });
                var ite;
                ite = _this3.state.selectedItem;
                ite.cook = text;
                _this3.setState({ selectedItem: ite });
                var itel;
                itel = _this3.state.items;
                itel[_this3.state.selectedIndex] = ite;
                _this3.setState({ items: itel });
                _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
                  _this3.setState({
                    isSaving: false
                  });
                });
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 173
              }
            })
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: ItemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 194
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: input_header_style, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 195
                }
              },
              ' Oven Setting '
            ),
            _react2.default.createElement(_reactNative.TextInput, {
              style: inputStyle,
              value: this.state.selectedItem.ovenSetting,
              onChangeText: function onChangeText(text) {
                _this3.setState({ isSaving: true });
                var ite;
                ite = _this3.state.selectedItem;
                ite.oven = text;
                _this3.setState({ selectedItem: ite });
                var itel;
                itel = _this3.state.items;
                itel[_this3.state.selectedIndex] = ite;
                _this3.setState({ items: itel });
                _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
                  _this3.setState({
                    isSaving: false
                  });
                });
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 196
              }
            })
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: ItemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 217
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: input_header_style, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 218
                }
              },
              ' Steps '
            ),
            _react2.default.createElement(_reactNative.TextInput, {
              style: inputStyle,
              value: this.state.selectedItem.steps,
              onChangeText: function onChangeText(text) {
                _this3.setState({ isSaving: true });
                var ite;
                ite = _this3.state.selectedItem;
                ite.steps = text;
                _this3.setState({ selectedItem: ite });
                var itel;
                itel = _this3.state.items;
                itel[_this3.state.selectedIndex] = ite;
                _this3.setState({ items: itel });
                _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
                  _this3.setState({
                    isSaving: false
                  });
                });
              },
              multiline: true,
              numberOfLines: 5,
              blurOnSubmit: false,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 219
              }
            })
          ),
          _react2.default.createElement(
            _reactNative.View,
            { style: ItemStyle, __source: {
                fileName: _jsxFileName,
                lineNumber: 244
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: input_header_style, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 245
                }
              },
              ' Ingrediants '
            ),
            _react2.default.createElement(_reactNative.TextInput, {
              style: inputStyle,
              value: this.state.selectedItem.ingrediants,
              onChangeText: function onChangeText(text) {
                _this3.setState({ isSaving: true });
                var ite;
                ite = _this3.state.selectedItem;
                ite.ingrediants = text;
                _this3.setState({ selectedItem: ite });
                var itel;
                itel = _this3.state.items;
                itel[_this3.state.selectedIndex] = ite;
                _this3.setState({ items: itel });
                _reactNative.AsyncStorage.multiSet([['recipeList', JSON.stringify(_this3.state.items)]]).then(function () {
                  _this3.setState({
                    isSaving: false
                  });
                });
              },
              multiline: true,
              numberOfLines: 5,
              blurOnSubmit: false,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 246
              }
            })
          )
        )
      );
    }
  }]);
  return RecepieScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Recipe',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = RecepieScreen;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});