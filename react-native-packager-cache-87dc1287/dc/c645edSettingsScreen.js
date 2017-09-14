Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/SettingsScreen.js';

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
  borderColor: '#bbb',
  backgroundColor: '#fefefe',
  borderWidth: 1,
  width: 50,
  justifyContent: 'space-between'
};

var SettingsScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(SettingsScreen, _React$Component);

  function SettingsScreen() {
    babelHelpers.classCallCheck(this, SettingsScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (SettingsScreen.__proto__ || Object.getPrototypeOf(SettingsScreen)).call(this));

    _this.state = {
      switchValue: true,
      items: [],
      items2: [],
      toGrocery: false,
      toPantry: false,
      isLoading: true,
      isSaving: false
    };
    return _this;
  }

  babelHelpers.createClass(SettingsScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _reactNative.AsyncStorage.multiGet(['groceryToPantry', 'pantryToGrocery', 'defaultGroceryList', 'pantryCategoryList']).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 4),
            _results$ = babelHelpers.slicedToArray(_results[0], 2),
            k1 = _results$[0],
            grocery_json = _results$[1],
            _results$2 = babelHelpers.slicedToArray(_results[1], 2),
            k2 = _results$2[0],
            pantry_json = _results$2[1],
            _results$3 = babelHelpers.slicedToArray(_results[2], 2),
            k3 = _results$3[0],
            groceryList_json = _results$3[1],
            _results$4 = babelHelpers.slicedToArray(_results[3], 2),
            k4 = _results$4[0],
            pantryCat_json = _results$4[1];

        var pantry = JSON.parse(grocery_json);
        var grocery = JSON.parse(pantry_json);
        var groceryList = JSON.parse(groceryList_json);
        var pantryCat = JSON.parse(pantryCat_json);

        _this2.setState({
          items2: pantryCat,
          items: groceryList,
          toGrocery: grocery,
          toPantry: pantry,
          isLoading: false

        });
      });
    }
  }, {
    key: 'togglePantry',
    value: function togglePantry(value) {
      var _this3 = this;

      var bool = !this.state.toPantry;
      this.setState({ toPantry: bool });
      this.setState({ isSaving: true });
      _reactNative.AsyncStorage.multiSet([['groceryToPantry', JSON.stringify(bool)]]).then(function () {
        _this3.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'toggleGrocery',
    value: function toggleGrocery(value) {
      var _this4 = this;

      var bool = !this.state.toGrocery;
      this.setState({ toGrocery: bool });
      this.setState({ isSaving: true });
      _reactNative.AsyncStorage.multiSet([['pantryToGrocery', JSON.stringify(bool)]]).then(function () {
        _this4.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'deleteGrocery',
    value: function deleteGrocery() {
      var _this5 = this;

      this.setState({ isSaving: true });
      _reactNative.AsyncStorage.multiSet([['groceryList', JSON.stringify([])]]).then(function () {
        _this5.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'deletePantry',
    value: function deletePantry() {
      var _this6 = this;

      this.setState({ isSaving: true });
      _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify([])]]).then(function () {
        _this6.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var _state = this.state,
          toGrocery = _state.toGrocery,
          toPantry = _state.toPantry,
          buttons = _state.timeFrames,
          selectedIndex = _state.selectedIndex,
          items = _state.items,
          items2 = _state.items2;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 124
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: { width: 320, height: 520 }, source: require('./../icons/load.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 124
            }
          })
        );
      }
      if (this.state.isSaving) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 127
            }
          },
          _react2.default.createElement(_reactNative.Image, { source: require('./../icons/save.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 127
            }
          })
        );
      }

      return _react2.default.createElement(
        _reactNative.ScrollView,
        { style: { backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 131
          }
        },
        _react2.default.createElement(
          _reactNative.Text,
          { style: { fontSize: 20 }, __source: {
              fileName: _jsxFileName,
              lineNumber: 132
            }
          },
          'Groceries:'
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 133
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 15 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 134
              }
            },
            'Add removed items to pantry: '
          ),
          _react2.default.createElement(_reactNative.Switch, {
            onValueChange: function onValueChange() {
              _this7.togglePantry();
            },
            value: toPantry,
            onTintColor: window.purple,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 135
            }
          })
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 143
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 17 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 144
              }
            },
            'Defalut grocery List '
          )
        ),
        _react2.default.createElement(_AddRemoveList.AddRemoveList, {
          onAddItem: function onAddItem(new_item) {
            ites = items.concat([{ text: new_item, id: window.kelly_uID() }]);
            _this7.setState({
              items: ites
            });
            _this7.setState({ isSaving: true });
            _reactNative.AsyncStorage.multiSet([['defaultGroceryList', JSON.stringify(ites)]]).then(function () {
              _this7.setState({
                isSaving: false
              });
            });
          },
          onDismissItem: function onDismissItem(_ref) {
            var id = _ref.id;
            var items = _this7.state.items;

            ites = _.reject(items, { id: id });
            _this7.setState({
              items: ites
            });
            _this7.setState({ isSaving: true });
            _reactNative.AsyncStorage.multiSet([['defaultGroceryList', JSON.stringify(ites)]]).then(function () {
              _this7.setState({
                isSaving: false
              });
            });
          },
          onClickItem: function onClickItem(_ref2) {
            var id = _ref2.id;
          },
          items: items,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          }
        }),
        _react2.default.createElement(
          _reactNative.Text,
          { style: { fontSize: 20 }, __source: {
              fileName: _jsxFileName,
              lineNumber: 174
            }
          },
          'Pantry:'
        ),
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 175
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 15 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 176
              }
            },
            ' Add removed items to grocery list '
          ),
          _react2.default.createElement(_reactNative.Switch, {
            onValueChange: function onValueChange() {
              _this7.toggleGrocery();
            },
            value: toGrocery,
            onTintColor: window.purple,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            }
          })
        ),
        _react2.default.createElement(_AddRemoveList.AddRemoveList, {
          onAddItem: function onAddItem(new_item) {
            ites = _this7.state.items2.concat([{ text: new_item, id: window.kelly_uID() }]);
            _this7.setState({
              items2: ites
            });
            _this7.setState({ isSaving: true });
            _reactNative.AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(ites)]]).then(function () {
              _this7.setState({
                isSaving: false
              });
            });
          },
          onDismissItem: function onDismissItem(_ref3) {
            var id = _ref3.id;
            var items2 = _this7.state.items2;

            ites = _.reject(items2, { id: id });
            _this7.setState({
              items2: ites
            });
            _this7.setState({ isSaving: true });
            _reactNative.AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(ites)]]).then(function () {
              _this7.setState({
                isSaving: false
              });
            });
          },
          onClickItem: function onClickItem(_ref4) {
            var id = _ref4.id;
          },
          items: items2,

          __source: {
            fileName: _jsxFileName,
            lineNumber: 186
          }
        }),
        _react2.default.createElement(_reactNativeElements.Button, {
          onPress: function onPress() {
            return _this7.deleteGrocery();
          },
          buttonStyle: { backgroundColor: window.warmPurple, borderRadius: 10, overflow: 'hidden' },
          textStyle: { textAlign: 'center' },
          title: 'Delete grocery list',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 214
          }
        }),
        _react2.default.createElement(_reactNativeElements.Button, {
          onPress: function onPress() {
            return _this7.deletePantry();
          },
          buttonStyle: { backgroundColor: window.warmPurple, borderRadius: 10, overflow: 'hidden' },
          textStyle: { textAlign: 'center' },
          title: 'Delete pantry list',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 220
          }
        })
      );
    }
  }]);
  return SettingsScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Settings',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = SettingsScreen;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});