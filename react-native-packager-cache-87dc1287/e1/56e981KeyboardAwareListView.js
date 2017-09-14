Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareListView.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = babelHelpers.interopRequireDefault(_createReactClass);

var _reactNative = require('react-native');

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _KeyboardAwareMixin = require('./KeyboardAwareMixin');

var _KeyboardAwareMixin2 = babelHelpers.interopRequireDefault(_KeyboardAwareMixin);

var KeyboardAwareListView = (0, _createReactClass2.default)({
  propTypes: {
    viewIsInsideTabBar: _propTypes2.default.bool,
    resetScrollToCoords: _propTypes2.default.shape({
      x: _propTypes2.default.number.isRequired,
      y: _propTypes2.default.number.isRequired
    }),
    onScroll: _propTypes2.default.func,
    enableOnAndroid: _propTypes2.default.bool
  },
  mixins: [_KeyboardAwareMixin2.default],

  componentWillMount: function componentWillMount() {
    this.setViewIsInsideTabBar(!!this.props.viewIsInsideTabBar);
    if (this.props.resetScrollToCoords) {
      this.setResetScrollToCoords(this.props.resetScrollToCoords);
    }
  },

  onScroll: function onScroll(e) {
    this.handleOnScroll(e);
    this.props.onScroll && this.props.onScroll(e);
  },

  render: function render() {
    var _props = this.props,
        enableOnAndroid = _props.enableOnAndroid,
        contentContainerStyle = _props.contentContainerStyle;
    var keyboardSpace = this.state.keyboardSpace;


    var newContentContainerStyle = void 0;

    if (_reactNative.Platform.OS === 'android' && enableOnAndroid) {
      newContentContainerStyle = babelHelpers.extends({}, contentContainerStyle);
      newContentContainerStyle.paddingBottom = (newContentContainerStyle.paddingBottom || 0) + keyboardSpace;
    }

    return _react2.default.createElement(_reactNative.ListView, babelHelpers.extends({
      ref: '_rnkasv_keyboardView',
      keyboardDismissMode: 'interactive',
      contentInset: { bottom: keyboardSpace },
      automaticallyAdjustContentInsets: false,
      showsVerticalScrollIndicator: true,
      scrollEventThrottle: 0
    }, this.props, {
      contentContainerStyle: newContentContainerStyle || contentContainerStyle,
      onScroll: this.onScroll,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    }));
  }
});

exports.default = KeyboardAwareListView;