Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/App.js',
    _class,
    _temp;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeElements = require('react-native-elements');

var _MenuItem = require('./components/MenuItem');

var _MenuItem2 = babelHelpers.interopRequireDefault(_MenuItem);

var _UnitPriceScreen = require('./components/UnitPriceScreen');

var _UnitPriceScreen2 = babelHelpers.interopRequireDefault(_UnitPriceScreen);

var _GroceryScreen = require('./components/GroceryScreen');

var _GroceryScreen2 = babelHelpers.interopRequireDefault(_GroceryScreen);

var _UnitConvertScreen = require('./components/UnitConvertScreen');

var _UnitConvertScreen2 = babelHelpers.interopRequireDefault(_UnitConvertScreen);

var _ExpireScreen = require('./components/ExpireScreen');

var _ExpireScreen2 = babelHelpers.interopRequireDefault(_ExpireScreen);

var _PantryScreen = require('./components/PantryScreen');

var _PantryScreen2 = babelHelpers.interopRequireDefault(_PantryScreen);

var _RecipeScreen = require('./components/RecipeScreen');

var _RecipeScreen2 = babelHelpers.interopRequireDefault(_RecipeScreen);

var _SettingsScreen = require('./components/SettingsScreen');

var _SettingsScreen2 = babelHelpers.interopRequireDefault(_SettingsScreen);

var _reactNavigation = require('react-navigation');

var LayoutAnimation = require('react-native').LayoutAnimation;
var DEFAULT_ANIMATION = 'linear';

var _ = require('lodash');
var shortid = require('shortid');

var unitCompare_img = require('./icons/unitcompare.png');
var grocery_img = require('./icons/grocerylist.png');
var expiery_img = require('./icons/expirydates.png');
var unitConvert_img = require('./icons/unitconvert.png');
var setting_img = require('./icons/setting.png');
var recipes_img = require('./icons/recipes.png');
var pantry_img = require('./icons/pantry.png');

window.kelly_uID = function () {
  return shortid.generate();
};
window.black = '#030312';
window.blue = "#7cbab2";
window.lightGrey = '#c5cbd3';
window.darkGrey = "#b0b7b6";
window.purple = '#310a31';
window.warmPurple = '#432043';

var sections = [{
  nav_name: 'UnitPrice',
  image: unitCompare_img,
  name: "Unit Price"
}, {
  nav_name: 'Grocery',
  image: grocery_img,
  name: "Grocery List"
}, {
  name: "Expiry date",
  image: expiery_img,
  nav_name: 'Expire'
}, {
  name: "Unit Coversion",
  nav_name: 'UnitConvert',
  image: unitConvert_img
}, {
  name: "Pantry List",
  nav_name: 'Pantry',
  image: pantry_img
}, {
  nav_name: "Settings",
  image: setting_img,
  name: 'Settings'
}];

var styles = _reactNative.StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: window.blue,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: "column"
  },
  sideMenu: {
    flex: 1,
    backgroundColor: window.darkGrey,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: "column",
    paddingLeft: 50,
    borderRightWidth: 2
  }
});

var HomeScreen = function HomeScreen(_ref) {
  var sections = _ref.sections,
      toggleSlider = _ref.toggleSlider,
      onSelectApp = _ref.onSelectApp;

  var section_pairs = _.chunk(sections, 2);
  return _react2.default.createElement(
    _reactNative.View,
    { style: styles.container, __source: {
        fileName: _jsxFileName,
        lineNumber: 147
      }
    },
    _.map(section_pairs, function (pair, ix) {
      return _react2.default.createElement(
        _reactNative.View,
        { key: ix, style: styles.row, __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          }
        },
        _.map(pair, function (_ref2) {
          var name = _ref2.name,
              nav_name = _ref2.nav_name,
              image = _ref2.image;
          return _react2.default.createElement(_MenuItem2.default, {
            key: name,
            onPress: function onPress() {
              return onSelectApp(nav_name);
            },
            image: image,
            text: name,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 152
            }
          });
        })
      );
    })
  );
};

var App = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(App, _React$Component);

  function App() {
    babelHelpers.classCallCheck(this, App);

    var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      menuExpanded: false,
      numberDone: 0,
      isLoading: true,
      all_keys_are_there: ["pantryList", "groceryToPantry", "pantrytoGrocery", "groceryList", "pantryCategoryList", "recipeList", "defaultGroceryList"]
    };
    console.disableYellowBox = true;
    return _this;
  }

  babelHelpers.createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      _reactNative.AsyncStorage.getAllKeys().then(function (keys) {
        if (8 === keys.length) {
          console.log("found the values");
          _this2.setState({ isLoading: false });
        } else {
          console.log("setting values");
          _reactNative.AsyncStorage.multiSet([['pantryList', JSON.stringify([])], ['groceryToPantry', JSON.stringify(true)], ['pantryToGrocery', JSON.stringify(true)], ['groceryList', JSON.stringify([])], ['pantryCategoryList', JSON.stringify([{ text: "All", id: window.kelly_uID() }, { text: "Fridge", id: window.kelly_uID() }, { text: "Pantry", id: window.kelly_uID() }])], ['recipeList', JSON.stringify([])], ['defaultGroceryList', JSON.stringify([])]]).then(function () {
            _this2.setState({ isLoading: false });
          });
        }
      });
    }
  }, {
    key: 'toggleSideMenu',
    value: function toggleSideMenu() {
      this.setState({ menuExpanded: !this.state.menuExpanded });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var navigate = this.props.navigation.navigate;
      var _state = this.state,
          menuExpanded = _state.menuExpanded,
          isLoading = _state.isLoading;

      var nav_to = function nav_to(app_name) {
        return navigate(app_name);
      };

      if (isLoading) {
        return _react2.default.createElement(
          _reactNative.Text,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 223
            }
          },
          '"Loading..."'
        );
      }
      var keys;
      _reactNative.AsyncStorage.getAllKeys().then(function (keys) {
        console.log(keys);
        _reactNative.AsyncStorage.multiGet(keys).then(function (result) {});
      });

      return _react2.default.createElement(HomeScreen, {
        toggleSlider: function toggleSlider() {
          return _this3.toggleSideMenu();
        },
        sections: sections,
        onSelectApp: nav_to,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 235
        }
      });
    }
  }]);
  return App;
}(_react2.default.Component), _class.navigationOptions = {
  title: 'Welcome',
  headerTintColor: window.black,
  headerStyle: { backgroundColor: window.lightGrey }
}, _temp);

App.propTypes = {
  navigation: _react.PropTypes.object.isRequired
};

var SimpleApp = (0, _reactNavigation.StackNavigator)({
  Home: { screen: App },
  UnitPrice: { screen: _UnitPriceScreen2.default },
  Grocery: { screen: _GroceryScreen2.default },
  Expire: { screen: _ExpireScreen2.default },
  Recipe: { screen: _RecipeScreen2.default },
  Pantry: { screen: _PantryScreen2.default },
  UnitConvert: { screen: _UnitConvertScreen2.default },
  Settings: { screen: _SettingsScreen2.default }

}, {
  headerMode: 'screen'
});
_reactNative.AppRegistry.registerComponent('shopping-buddy', function () {
  return SimpleApp;
});
exports.default = SimpleApp;