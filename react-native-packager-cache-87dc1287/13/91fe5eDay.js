Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp2,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/node_modules/react-native-calendar/components/Day.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _styles = require('./styles');

var _styles2 = babelHelpers.interopRequireDefault(_styles);

var Day = (_temp2 = _class = function (_Component) {
  babelHelpers.inherits(Day, _Component);

  function Day() {
    var _ref;

    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, Day);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = Day.__proto__ || Object.getPrototypeOf(Day)).call.apply(_ref, [this].concat(args))), _this), _this.dayCircleStyle = function (isWeekend, isSelected, isToday, event) {
      var customStyle = _this.props.customStyle;

      var dayCircleStyle = [_styles2.default.dayCircleFiller, customStyle.dayCircleFiller];

      if (isSelected) {
        if (isToday) {
          dayCircleStyle.push(_styles2.default.currentDayCircle, customStyle.currentDayCircle);
        } else {
          dayCircleStyle.push(_styles2.default.selectedDayCircle, customStyle.selectedDayCircle);
        }
      }

      if (event) {
        if (isSelected) {
          dayCircleStyle.push(_styles2.default.hasEventDaySelectedCircle, customStyle.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
        } else {
          dayCircleStyle.push(_styles2.default.hasEventCircle, customStyle.hasEventCircle, event.hasEventCircle);
        }
      }
      return dayCircleStyle;
    }, _this.dayTextStyle = function (isWeekend, isSelected, isToday, event) {
      var customStyle = _this.props.customStyle;

      var dayTextStyle = [_styles2.default.day, customStyle.day];

      if (isToday && !isSelected) {
        dayTextStyle.push(_styles2.default.currentDayText, customStyle.currentDayText);
      } else if (isToday || isSelected) {
        dayTextStyle.push(_styles2.default.selectedDayText, customStyle.selectedDayText);
      } else if (isWeekend) {
        dayTextStyle.push(_styles2.default.weekendDayText, customStyle.weekendDayText);
      }

      if (event) {
        dayTextStyle.push(_styles2.default.hasEventText, customStyle.hasEventText, event.hasEventText);
      }
      return dayTextStyle;
    }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  babelHelpers.createClass(Day, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          customStyle = _props.customStyle;
      var _props2 = this.props,
          filler = _props2.filler,
          event = _props2.event,
          isWeekend = _props2.isWeekend,
          isSelected = _props2.isSelected,
          isToday = _props2.isToday,
          showEventIndicators = _props2.showEventIndicators;


      return filler ? _react2.default.createElement(
        _reactNative.TouchableWithoutFeedback,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: [_styles2.default.dayButtonFiller, customStyle.dayButtonFiller], __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            }
          },
          _react2.default.createElement(_reactNative.Text, { style: [_styles2.default.day, customStyle.day], __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            }
          })
        )
      ) : _react2.default.createElement(
        _reactNative.TouchableOpacity,
        { onPress: this.props.onPress, __source: {
            fileName: _jsxFileName,
            lineNumber: 88
          }
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: [_styles2.default.dayButton, customStyle.dayButton, isWeekend ? _styles2.default.weekendDayButton : null], __source: {
              fileName: _jsxFileName,
              lineNumber: 89
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: this.dayCircleStyle(isWeekend, isSelected, isToday, event), __source: {
                fileName: _jsxFileName,
                lineNumber: 90
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              { style: this.dayTextStyle(isWeekend, isSelected, isToday, event), __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                }
              },
              caption
            )
          ),
          showEventIndicators && _react2.default.createElement(_reactNative.View, { style: [_styles2.default.eventIndicatorFiller, customStyle.eventIndicatorFiller, event && _styles2.default.eventIndicator, event && customStyle.eventIndicator, event && event.eventIndicator],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 94
            }
          })
        )
      );
    }
  }]);
  return Day;
}(_react.Component), _class.defaultProps = {
  customStyle: {}
}, _class.propTypes = {
  caption: _react.PropTypes.any,
  customStyle: _react.PropTypes.object,
  filler: _react.PropTypes.bool,
  event: _react.PropTypes.object,
  isSelected: _react.PropTypes.bool,
  isToday: _react.PropTypes.bool,
  isWeekend: _react.PropTypes.bool,
  onPress: _react.PropTypes.func,
  showEventIndicators: _react.PropTypes.bool
}, _temp2);
exports.default = Day;