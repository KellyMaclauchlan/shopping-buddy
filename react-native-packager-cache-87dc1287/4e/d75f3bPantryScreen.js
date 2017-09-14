Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/PantryScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _AddRemoveList = require('./AddRemoveList');

var _ItemScreen = require('./ItemScreen');

var _ = require('lodash');

var colours = { blue: "#7cbab2",
  darkGrey: '#b0b7b6',
  black: '#030312',
  lightGrey: '#c5cbd3',
  purple: '#310a31',
  warmPurple: '#432043' };

var PantryScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(PantryScreen, _React$Component);

  function PantryScreen(props) {
    babelHelpers.classCallCheck(this, PantryScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (PantryScreen.__proto__ || Object.getPrototypeOf(PantryScreen)).call(this, props));

    _this.state = {
      categories: [],
      items: [],
      inCategories: false,
      useList: [],
      currentCategory: null,
      toGrocery: false,
      groceryList: [],
      isSaving: false,
      isLoading: true,
      showItem: false,
      selectedItem: null,
      selectedIndex: null
    };
    return _this;
  }

  babelHelpers.createClass(PantryScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _reactNative.AsyncStorage.multiGet(['groceryList', 'pantryToGrocery', 'pantryList', 'pantryCategoryList']).then(function (results) {
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
            pantryCat_json = _results$4[1];

        var list = JSON.parse(grocery_json);
        var pantry = JSON.parse(pantry_json);
        var pantryList = JSON.parse(pantryList_json);
        var pantryCat = JSON.parse(pantryCat_json);
        pantryList.map(function (item) {
          return console.log(item.text);
        });
        _this2.setState({
          toGrocery: pantry,
          items: pantryList,
          isLoading: false,
          groceryList: list,
          categories: pantryCat,
          useList: pantryCat
        });
      });
    }
  }, {
    key: 'goToCategory',
    value: function goToCategory(category) {
      if (category.text === "All") {
        this.setState({
          useList: this.state.items
        });
      }

      var list = this.state.items.map(function (item) {
        return item.pantryLocation === category.text;
      });
      currentCategory = category.text;
      this.setState({
        useList: list
      });
    }
  }, {
    key: 'onSave',
    value: function onSave(item) {
      var _this3 = this;

      var ites = this.state.items;
      ites[this.state.selectedIndex] = item;
      this.setState({
        isSaving: true
      });
      _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify(ites)]]).then(function () {
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
          inCategories = _state.inCategories,
          useList = _state.useList,
          showItem = _state.showItem;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 108
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: { width: 320, height: 520 }, source: require('./../icons/load.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 108
            }
          })
        );
      }
      if (this.state.isSaving) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 111
            }
          },
          _react2.default.createElement(_reactNative.Image, { source: require('./../icons/save.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 111
            }
          })
        );
      }
      if (showItem) {
        console.log("showing item");
        return _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
              fileName: _jsxFileName,
              lineNumber: 115
            }
          },
          _react2.default.createElement(_reactNative.Button, {
            title: 'Back',
            style: { justifyContent: 'flex-end' },
            onPress: function onPress() {
              return _this4.setState({ showItem: false });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 116
            }
          }),
          _react2.default.createElement(_ItemScreen.ItemScreen, { onSave: function onSave(item) {
              return _this4.onSave(item);
            }, item: this.state.selectedItem, __source: {
              fileName: _jsxFileName,
              lineNumber: 120
            }
          })
        );
      }
      return _react2.default.createElement(
        _reactNative.View,
        { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 122
          }
        },
        inCategories ? _react2.default.createElement(_reactNative.Button, {
          title: 'Back',
          style: { justifyContent: 'flex-end', width: 50 },
          onPress: function onPress() {
            return _this4.setState({
              useList: _this4.state.categories,
              inCategories: false
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          }
        }) : null,
        _react2.default.createElement(_AddRemoveList.AddRemoveList, {
          onAddItem: function onAddItem(new_item) {
            var currentCategory = _this4.state.currentCategory;

            console.log(_this4.state);
            _this4.setState({ isSaving: true });
            if (inCategories) {
              var cat = currentCategory === "All" ? null : currentCategory;
              var item = {
                text: new_item,
                expiryDate: null,
                defaultItem: false,
                pantryLocation: cat,
                quantity: 1,
                notes: "",
                id: window.kelly_uID()
              };
              var ites = _this4.state.items.concat([item]);
              var use = _this4.state.useList.concat([item]);
              _this4.setState({
                items: ites,
                useList: use,
                isSaving: true
              }, function () {
                console.log(ites);
                _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify(ites)]]).then(function () {
                  console.log("done");
                  _this4.setState({

                    isSaving: false
                  });
                });
              });
            } else {
              var ites = _this4.state.categories;
              _this4.setState({
                categories: ites.concat([{ text: new_item, id: window.kelly_uID() }])
              }, function () {
                _reactNative.AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(_this4.state.categories)]]).then(function () {
                  _this4.setState({
                    isSaving: false
                  });
                });
              });
            }
          },
          onDismissItem: function onDismissItem(_ref) {
            var id = _ref.id;

            if (inCategories) {
              _this4.setState({ isSaving: true });

              var _state2 = _this4.state,
                  _items = _state2.items,
                  _useList = _state2.useList;

              console.log(id);
              var item = _.find(_items, { id: id });
              console.log(item);
              var ites = _.reject(_items, { id: id });
              _this4.setState({
                items: ites,
                useList: _.reject(_useList, { id: id })
              });
              var saveList = [['pantryList', JSON.stringify(ites)]];
              if (_this4.state.toGrocery) {
                var gList = _this4.state.groceryList.concat([item]);
                _this4.setState({
                  groceryList: gList
                });
                saveList = [['groceryList', JSON.stringify(gList)], ['pantryList', JSON.stringify(ites)]];
              }
              _reactNative.AsyncStorage.multiSet(saveList).then(function () {
                _this4.setState({
                  isSaving: false
                });
              });
            } else {
              var _state3 = _this4.state,
                  categories = _state3.categories,
                  _useList2 = _state3.useList;

              var cats = _.reject(categories, { id: id });
              _this4.setState({
                categories: cats,
                useList: _.reject(_useList2, { id: id })
              });
              _reactNative.AsyncStorage.multiSet([['pantryCategoryList', JSON.stringify(cats)]]).then(function () {
                _this4.setState({
                  isSaving: false
                });
              });
            }
          },
          onClickItem: function onClickItem(category) {
            if (inCategories) {
              var _items2 = _this4.state.items;

              _this4.setState({
                selectedItem: category,
                selectedIndex: _items2.indexOf(category),
                showItem: true
              });
            } else {
              if (category.text === "All") {
                _this4.setState({
                  useList: _this4.state.items,
                  currentCategory: null,
                  inCategories: true
                });
              } else {
                var list = _this4.state.items.filter(function (item) {
                  return item.pantryLocation === category.text;
                });
                currentCategory = category.text;
                _this4.setState({
                  useList: list,
                  currentCategory: category.text,
                  inCategories: true
                });
              }
            }
          },
          items: useList,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 133
          }
        })
      );
    }
  }]);
  return PantryScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'In your pantry',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);
exports.default = PantryScreen;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});