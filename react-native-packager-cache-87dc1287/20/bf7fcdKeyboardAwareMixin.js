Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

var _reactNative2 = babelHelpers.interopRequireDefault(_reactNative);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = babelHelpers.interopRequireDefault(_reactTimerMixin);

var _KAM_DEFAULT_TAB_BAR_HEIGHT = 49;
var _KAM_KEYBOARD_OPENING_TIME = 250;
var _KAM_EXTRA_HEIGHT = 75;

var KeyboardAwareMixin = {
  mixins: [_reactTimerMixin2.default],
  propTypes: {
    enableAutoAutomaticScroll: _propTypes2.default.bool,
    keyboardOpeningTime: _propTypes2.default.number,
    extraHeight: _propTypes2.default.number,
    extraScrollHeight: _propTypes2.default.number,
    enableResetScrollToCoords: _propTypes2.default.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enableAutoAutomaticScroll: true,
      extraHeight: _KAM_EXTRA_HEIGHT,
      extraScrollHeight: 0,
      enableResetScrollToCoords: true,
      keyboardOpeningTime: _KAM_KEYBOARD_OPENING_TIME
    };
  },

  setViewIsInsideTabBar: function setViewIsInsideTabBar(viewIsInsideTabBar) {
    this.viewIsInsideTabBar = viewIsInsideTabBar;
    var keyboardSpace = viewIsInsideTabBar ? _KAM_DEFAULT_TAB_BAR_HEIGHT : 0;
    if (this.state.keyboardSpace !== keyboardSpace) {
      this.setState({ keyboardSpace: keyboardSpace });
    }
  },

  setResetScrollToCoords: function setResetScrollToCoords(coords) {
    this.resetCoords = coords;
  },

  getInitialState: function getInitialState() {
    this.viewIsInsideTabBar = false;
    this.keyboardWillShowEvent = undefined;
    this.keyboardWillHideEvent = undefined;
    return {
      keyboardSpace: 0
    };
  },

  updateKeyboardSpace: function updateKeyboardSpace(frames) {
    var _this = this;

    var keyboardSpace = frames.endCoordinates.height + this.props.extraScrollHeight;
    if (this.props.viewIsInsideTabBar) {
      keyboardSpace -= _KAM_DEFAULT_TAB_BAR_HEIGHT;
    }
    this.setState({ keyboardSpace: keyboardSpace });

    if (this.props.enableAutoAutomaticScroll) {
      var currentlyFocusedField = _reactNative.TextInput.State.currentlyFocusedField();
      var responder = this.getScrollResponder();
      if (!currentlyFocusedField || !responder) {
        return;
      }
      _reactNative.UIManager.viewIsDescendantOf(currentlyFocusedField, responder.getInnerViewNode(), function (isAncestor) {
        if (isAncestor) {
          _reactNative.UIManager.measureInWindow(currentlyFocusedField, function (x, y, width, height) {
            var textInputBottomPosition = y + height;
            var keyboardPosition = frames.endCoordinates.screenY;
            var totalExtraHeight = _this.props.extraScrollHeight + _this.props.extraHeight;

            if (_reactNative.Platform.OS === 'ios') {
              if (textInputBottomPosition > keyboardPosition - totalExtraHeight) {
                _this.scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
              }
            } else {
              if (textInputBottomPosition > keyboardPosition) {
                keyboardSpace = keyboardSpace - (textInputBottomPosition - keyboardPosition);
                _this.setState({ keyboardSpace: keyboardSpace });

                _this.scrollForExtraHeightOnAndroid(totalExtraHeight);
              } else if (textInputBottomPosition > keyboardPosition - totalExtraHeight) {
                _this.scrollForExtraHeightOnAndroid(totalExtraHeight - (keyboardPosition - textInputBottomPosition));
              }
            }
          });
        }
      });
    }
    if (!this.resetCoords) {
      if (!this.defaultResetScrollToCoords) {
        this.defaultResetScrollToCoords = this.position;
      }
    }
  },

  resetKeyboardSpace: function resetKeyboardSpace() {
    var keyboardSpace = this.props.viewIsInsideTabBar ? _KAM_DEFAULT_TAB_BAR_HEIGHT + this.props.extraScrollHeight : this.props.extraScrollHeight;
    this.setState({ keyboardSpace: keyboardSpace });

    if (this.props.enableResetScrollToCoords === false) {
      this.defaultResetScrollToCoords = null;
      return;
    } else if (this.resetCoords) {
      this.scrollToPosition(this.resetCoords.x, this.resetCoords.y, true);
    } else {
      if (this.defaultResetScrollToCoords) {
        this.scrollToPosition(this.defaultResetScrollToCoords.x, this.defaultResetScrollToCoords.y, true);
        this.defaultResetScrollToCoords = null;
      } else {
        this.scrollToPosition(0, 0, true);
      }
    }
  },

  componentDidMount: function componentDidMount() {
    if (_reactNative.Platform.OS === 'ios') {
      this.keyboardWillShowEvent = _reactNative.Keyboard.addListener('keyboardWillShow', this.updateKeyboardSpace);
      this.keyboardWillHideEvent = _reactNative.Keyboard.addListener('keyboardWillHide', this.resetKeyboardSpace);
    } else if (_reactNative.Platform.OS === 'android' && this.props.enableOnAndroid) {
      this.keyboardWillShowEvent = _reactNative.Keyboard.addListener('keyboardDidShow', this.updateKeyboardSpace);
      this.keyboardWillHideEvent = _reactNative.Keyboard.addListener('keyboardDidHide', this.resetKeyboardSpace);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.keyboardWillShowEvent && this.keyboardWillShowEvent.remove();
    this.keyboardWillHideEvent && this.keyboardWillHideEvent.remove();
  },

  getScrollResponder: function getScrollResponder() {
    return this.refs._rnkasv_keyboardView && this.refs._rnkasv_keyboardView.getScrollResponder();
  },


  scrollToPosition: function scrollToPosition(x, y) {
    var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var responder = this.getScrollResponder();
    responder && responder.scrollResponderScrollTo({ x: x, y: y, animated: animated });
  },

  scrollToEnd: function scrollToEnd() {
    var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var responder = this.getScrollResponder();
    responder && responder.scrollResponderScrollToEnd({ animated: animated });
  },

  scrollForExtraHeightOnAndroid: function scrollForExtraHeightOnAndroid(extraHeight) {
    this.scrollToPosition(0, this.position.y + extraHeight, true);
  },

  scrollToFocusedInput: function scrollToFocusedInput(reactNode, extraHeight, keyboardOpeningTime) {
    var _this2 = this;

    if (extraHeight === undefined) {
      extraHeight = this.props.extraHeight;
    }

    if (keyboardOpeningTime === undefined) {
      keyboardOpeningTime = this.props.keyboardOpeningTime;
    }

    this.setTimeout(function () {
      var responder = _this2.getScrollResponder();
      responder && responder.scrollResponderScrollNativeHandleToKeyboard(reactNode, extraHeight, true);
    }, keyboardOpeningTime);
  },

  scrollToFocusedInputWithNodeHandle: function scrollToFocusedInputWithNodeHandle(nodeID, extraHeight, keyboardOpeningTime) {
    if (extraHeight === undefined) {
      extraHeight = this.props.extraHeight;
    }

    if (keyboardOpeningTime === undefined) {
      keyboardOpeningTime = this.props.keyboardOpeningTime;
    }

    var reactNode = _reactNative2.default.findNodeHandle(nodeID);
    this.scrollToFocusedInput(reactNode, extraHeight + this.props.extraScrollHeight, keyboardOpeningTime);
  },

  position: { x: 0, y: 0 },

  defaultResetScrollToCoords: null,

  handleOnScroll: function handleOnScroll(e) {
    this.position = e.nativeEvent.contentOffset;
  }
};

exports.default = KeyboardAwareMixin;