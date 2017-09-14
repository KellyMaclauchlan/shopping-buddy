Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/components/ExpireScreen.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _reactNativeCalendar = require('react-native-calendar');

var _reactNativeCalendar2 = babelHelpers.interopRequireDefault(_reactNativeCalendar);

var _ListItem = require('./ListItem');

var _ListItem2 = babelHelpers.interopRequireDefault(_ListItem);

var _ItemScreen = require('./ItemScreen');

var _ = require('lodash');

function getExpiryList(wholeList) {
  return _.filter(wholeList, function (item) {
    return item.expiryDate !== null;
  });
};

function getExpiryListWeek(expiryList) {
  return _.filter(expiryList, function (item) {
    return thisWeek(new Date(item.expiryDate)) === true;
  });
}

function getExpiryListMonth(expiryList) {
  return _.filter(expiryList, function (item) {
    return thisMonth(new Date(item.expiryDate)) === true;
  });
}

function beforeDate(date, cutoff) {
  return date < cutoff;
}

function thisMonth(date) {
  cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + 31);
  var result = beforeDate(date.getTime(), cutoff.getTime());
  return result;
}

function thisWeek(date) {
  cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + 7);
  var result = beforeDate(date.getTime(), cutoff.getTime());
  return result;
}

var ExpireScreen = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(ExpireScreen, _React$Component);

  function ExpireScreen() {
    babelHelpers.classCallCheck(this, ExpireScreen);

    var _this = babelHelpers.possibleConstructorReturn(this, (ExpireScreen.__proto__ || Object.getPrototypeOf(ExpireScreen)).call(this));

    _this._keyExtractor = function (item, index) {
      return item.id;
    };

    var expiredList;

    _this.state = {
      switchValue: true,
      timeFrames: ["This Week", "This Month", "All"],
      week: [],
      month: [],
      allList: [],
      listSource: [],
      selectedIndex: 2,
      groceryList: [],
      isLoading: true,
      isSaving: false,
      pantryList: [],
      showItem: false,
      dates: []

    };
    return _this;
  }

  babelHelpers.createClass(ExpireScreen, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var list;
      _reactNative.AsyncStorage.multiGet(['pantryList', 'groceryList']).then(function (results) {
        var _results = babelHelpers.slicedToArray(results, 2),
            _results$ = babelHelpers.slicedToArray(_results[0], 2),
            k1 = _results$[0],
            pantry_json = _results$[1],
            _results$2 = babelHelpers.slicedToArray(_results[1], 2),
            k2 = _results$2[0],
            grocery_json = _results$2[1];

        var pantry = getExpiryList(JSON.parse(pantry_json));
        var pantryL = JSON.parse(pantry_json);
        var grocery = JSON.parse(grocery_json);
        console.log(pantry);
        var thisWeek = getExpiryListWeek(pantry);
        var thisMonth = getExpiryListMonth(pantry);
        console.log(thisWeek);
        console.log(thisMonth);
        var thisDates = _.map(pantry, 'expiryDate');
        console.log(thisDates);
        _this2.setState({
          week: thisWeek,
          month: thisMonth,
          allList: pantry,
          listSource: pantry,
          isLoading: false,
          groceryList: grocery,
          pantryList: pantryL,
          dates: thisDates
        });
      });
    }
  }, {
    key: 'toggleCalendar',
    value: function toggleCalendar(value) {
      this.setState({ switchValue: !this.state.switchValue });
    }
  }, {
    key: 'selectTimeFrame',
    value: function selectTimeFrame(value) {
      switch (value) {
        case 0:
          this.setState({ listSource: this.state.week });
          break;
        case 1:
          this.setState({ listSource: this.state.month });
          break;
        case 2:
          this.setState({ listSource: this.state.allList });
          break;
      }
      this.setState({ selectedIndex: value });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      var _this3 = this;

      this.setState({ isSaving: true });
      var new_listSource = _.without(this.state.listSource, item);
      var new_allList = _.without(this.state.allList, item);
      _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify(new_allList)]]).then(function () {
        _this3.setState({
          isSaving: false,
          listSource: new_listSource,
          allList: new_allList
        });
      });
    }
  }, {
    key: 'addItemToCart',
    value: function addItemToCart(item) {
      var _this4 = this;

      this.setState({ isSaving: true });

      var new_listSource = _.without(this.state.listSource, item);
      var new_allList = _.without(this.state.allList, item);

      var new_groceryList = this.state.groceryList.concat([babelHelpers.extends({}, item, { expiryDate: false })]);

      _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify(new_allList)], ['groceryList', JSON.stringify(new_groceryList)]]).then(function () {
        _this4.setState({
          isSaving: false,
          listSource: new_listSource,
          allList: new_allList,
          groceryList: new_groceryList
        });
      });
    }
  }, {
    key: 'onSave',
    value: function onSave(item) {
      var _this5 = this;

      var ites = this.state.pantryList;
      ites[this.state.selectedIndex] = item;
      isSaving = true;
      _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify(ites)]]).then(function () {
        _this5.setState({
          isSaving: false
        });
      });
    }
  }, {
    key: 'onClickItem',
    value: function onClickItem(item) {
      var pantryList = this.state.pantryList;

      console.log(item.text);
      this.setState({
        selectedItem: item,
        selectedIndex: pantryList.indexOf(item),
        showItem: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state = this.state,
          showCalendar = _state.switchValue,
          buttons = _state.timeFrames,
          selectedIndex = _state.selectedIndex,
          showItem = _state.showItem,
          dates = _state.dates;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            }
          },
          _react2.default.createElement(_reactNative.Image, { style: { width: 320, height: 520 }, source: require('./../icons/load.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            }
          })
        );
      }
      if (this.state.isSaving) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { alignItems: "center" }, __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            }
          },
          _react2.default.createElement(_reactNative.Image, { source: require('./../icons/save.gif'), __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            }
          })
        );
      }
      console.log(dates);
      if (showItem) {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1, backgroundColor: window.darkGrey }, __source: {
              fileName: _jsxFileName,
              lineNumber: 184
            }
          },
          _react2.default.createElement(_reactNative.Button, {
            title: 'Back',
            style: { justifyContent: 'flex-end' },
            onPress: function onPress() {
              return _this6.setState({ showItem: false });
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 185
            }
          }),
          _react2.default.createElement(_ItemScreen.ItemScreen, { onSave: function onSave(item) {
              return _this6.onSave(item);
            }, item: this.state.selectedItem, __source: {
              fileName: _jsxFileName,
              lineNumber: 189
            }
          })
        );
      }

      return _react2.default.createElement(
        _reactNative.ScrollView,
        { style: { backgroundColor: window.darkGrey }, __source: {
            fileName: _jsxFileName,
            lineNumber: 193
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: { flexDirection: 'row', justifyContent: 'flex-end' }, __source: {
              fileName: _jsxFileName,
              lineNumber: 194
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontSize: 20 }, __source: {
                fileName: _jsxFileName,
                lineNumber: 195
              }
            },
            'Show Calendar '
          ),
          _react2.default.createElement(_reactNative.Switch, {
            onValueChange: function onValueChange() {
              _this6.toggleCalendar();
            },
            value: this.state.switchValue,
            onTintColor: window.purple,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 196
            }
          })
        ),
        showCalendar ? _react2.default.createElement(_reactNativeCalendar2.default, {
          ref: 'calendar',
          eventDates: dates,
          weekStart: 0,
          customStyle: {
            hasEventCircle: { backgroundColor: 'powderblue' },
            weekendDayText: { color: 'black' },
            currentDayText: { color: 'grey' }
          },
          scrollEnabled: true,
          showControls: true,
          showEventIndicators: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 206
          }
        }) : null,
        _react2.default.createElement(_reactNativeElements.ButtonGroup, {
          onPress: function onPress(val) {
            return _this6.selectTimeFrame(val);
          },
          selectedIndex: selectedIndex,
          buttons: buttons,
          selectedBackgroundColor: window.darkGrey,
          innerBorderStyle: { color: window.darkGrey },
          containerStyle: { height: 50, backgroundColor: window.darkGrey, borderColor: window.darkGrey },
          buttonStyle: { marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, overflow: 'hidden', backgroundColor: window.blue },
          textStyle: { color: 'black' },
          selectedTextStyle: { fontWeight: 'bold', color: 'black' },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 220
          }
        }),
        _react2.default.createElement(_reactNative.FlatList, {
          data: this.state.listSource,
          keyExtractor: this._keyExtractor,
          renderItem: function renderItem(_ref) {
            var item = _ref.item;
            return _react2.default.createElement(_ListItem2.default, {
              item: item,
              seeItem: function seeItem(item) {
                return _this6.onClickItem(item);
              },
              remove: function remove(item) {
                return _this6.removeItem(item);
              },
              addToCart: function addToCart(item) {
                return _this6.addItemToCart(item);
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 236
              }
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 232
          }
        })
      );
    }
  }]);
  return ExpireScreen;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Expire Dates'
}, _temp);
exports.default = ExpireScreen;


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});