Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/GroceryScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _AddRemoveList = require('./AddRemoveList');

var _ItemScreen = require('./ItemScreen');

var _ = require('lodash');
var GroceryScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(GroceryScreen, _React$Component);

  function GroceryScreen(props) {
    babelHelpers.classCallCheck(this, GroceryScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (GroceryScreen.__proto__ || Object.getPrototypeOf(GroceryScreen)).call(this, props));

    _this.state = {
      items: [],
      toPantry: [],
      pantryList: [],
      isLoading: true,
      showItem: false
    };
    return _this;
  }

  babelHelpers.createClass(GroceryScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var list;
      _reactNative.AsyncStorage.multiGet(['groceryList', 'groceryToPantry', 'pantryList', 'defaultGroceryList']).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 4),
            _results$ = babelHelpers.slicedToArray(_results[0], 2),
            k1 = _results$[0],
            grocery_json = _results$[1],
            _results$2 = babelHelpers.slicedToArray(_results[1], 2),
            k2 = _results$2[0],
            pantry_json = _results$2[1],
            _results$3 = babelHelpers.slicedToArray(_results[2], 2),
            k3 = _results$3[0],
            pantryList_json = _results$3[1],
            _results$4 = babelHelpers.slicedToArray(_results[3], 2),
            k4 = _results$4[0],
            defaultGroceryList_json = _results$4[1];

        var list = JSON.parse(grocery_json);
        var pantry = JSON.parse(pantry_json);
        var pantryList = JSON.parse(pantryList_json);
        var defaultList = JSON.parse(defaultGroceryList_json);

        _this2.setState({
          toPantry: pantry,
          items: list,
          isLoading: false,
          pantryList: pantryList,
          wholeList: defaultList.concat(list)
        });
      });
    }
  }, {
    key: 'onSave',
    value: function onSave(item) {
      var _this3 = this;

      var ites = this.state.items;
      ites[this.state.selectedIndex] = item;
      isSaving = true;
      _reactNative.AsyncStorage.multiSet([['groceryList', JSON.stringify(ites)]]).then(function () {
        _this3.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          items = _state.items,
          loading = _state.loading,
          showItem = _state.showItem,
          wholeList = _state.wholeList;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: { width: 320, height: 520 }, source: require('./../icons/load.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            }
          })
        );
      }
      if (this.state.isSaving) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            }
          },
          _react2.default.createElement(_reactNative.Image, { source: require('./../icons/save.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            }
          })
        );
      }

      if (showItem) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
              fileName: _jsxFileName,
              lineNumber: 86
            }
          },
          _react2.default.createElement(_reactNative.Button, {
            title: 'Back',
            onPress: function onPress() {
              return _this4.setState({ showItem: false });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 87
            }
          }),
          _react2.default.createElement(_ItemScreen.ItemScreen, { onSave: function onSave(item) {
              return _this4.onSave(item);
            }, item: this.state.selectedItem, __source: {
              fileName: _jsxFileName,
              lineNumber: 90
            }
          })
        );
      }

      return _react2.default.createElement(
        _reactNative.ScrollView,
        { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          }
        },
        _react2.default.createElement(_AddRemoveList.AddRemoveList, {
          onAddItem: function onAddItem(new_item) {
            _this4.setState({ isSaving: true });
            var item = {
              text: new_item,
              expiryDate: null,
              defaultItem: false,
              pantryLocation: null,
              quantity: 1,
              notes: "",
              id: window.kelly_uID()
            };
            var ites = _this4.state.items.concat([item]);
            _this4.setState({
              items: ites
            });
            console.log(ites);
            _reactNative.AsyncStorage.multiSet([['groceryList', JSON.stringify(ites)]]).then(function () {
              _this4.setState({
                isSaving: false
              });
            });
          },

          onDismissItem: function onDismissItem(_ref) {
            var id = _ref.id;

            _this4.setState({ isSaving: true });
            var _state2 = _this4.state,
                items = _state2.items,
                wholeList = _state2.wholeList;

            var item = _.find(items, { id: id });
            var ites = _.reject(items, { id: id });
            _this4.setState({
              items: ites,
              wholeList: _.reject(wholeList, { id: id })
            });
            var saveList = [['groceryList', JSON.stringify(ites)]];
            if (_this4.state.toPantry) {
              var pantry = _this4.state.pantryList.concat([item]);
              _this4.setState({
                pantryList: pantry
              });
              saveList = [['pantryList', JSON.stringify(pantry)], ['groceryList', JSON.stringify(ites)]];
            }
            _reactNative.AsyncStorage.multiSet(saveList).then(function () {
              _this4.setState({
                isSaving: false
              });
            });
          },

          onClickItem: function onClickItem(item) {
            var items = _this4.state.items;

            console.log(item.text);
            _this4.setState({
              selectedItem: item,
              selectedIndex: items.indexOf(item),
              showItem: true
            });
          },

          items: this.state.items,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        })
      );
    }
  }]);
  return GroceryScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Grocery List',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = GroceryScreen;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});