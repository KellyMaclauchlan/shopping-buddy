Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class,
    _temp2,
    _jsxFileName = '/Users/kellymaclauchlan/Documents/react/shopping-buddy/node_modules/react-native-calendar/components/Calendar.js';

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactNative = require('react-native');

var _Day = require('./Day');

var _Day2 = babelHelpers.interopRequireDefault(_Day);

var _moment = require('moment');

var _moment2 = babelHelpers.interopRequireDefault(_moment);

var _styles = require('./styles');

var _styles2 = babelHelpers.interopRequireDefault(_styles);

var DEVICE_WIDTH = _reactNative.Dimensions.get('window').width;
var VIEW_INDEX = 2;

function getNumberOfWeeks(month, weekStart) {
  var firstDay = (0, _moment2.default)(month).startOf('month').day();
  var offset = (firstDay - weekStart + 7) % 7;
  var days = (0, _moment2.default)(month).daysInMonth();
  return Math.ceil((offset + days) / 7);
}

var Calendar = (_temp2 = _class = function (_Component) {
  babelHelpers.inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    babelHelpers.classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentMoment: (0, _moment2.default)(_this.props.startDate),
      selectedMoment: (0, _moment2.default)(_this.props.selectedDate),
      rowHeight: null
    }, _this.onPrev = function () {
      var newMoment = _this.props.calendarFormat === 'monthly' ? (0, _moment2.default)(_this.state.currentMoment).subtract(1, 'month') : (0, _moment2.default)(_this.state.currentMoment).subtract(1, 'week');
      _this.setState({ currentMoment: newMoment });
      _this.props.onTouchPrev && _this.props.onTouchPrev(newMoment);
    }, _this.onNext = function () {
      var newMoment = _this.props.calendarFormat === 'monthly' ? (0, _moment2.default)(_this.state.currentMoment).add(1, 'month') : (0, _moment2.default)(_this.state.currentMoment).add(1, 'week');
      _this.setState({ currentMoment: newMoment });
      _this.props.onTouchNext && _this.props.onTouchNext(newMoment);
    }, _this.onWeekRowLayout = function (event) {
      if (_this.state.rowHeight !== event.nativeEvent.layout.height) {
        _this.setState({ rowHeight: event.nativeEvent.layout.height });
      }
    }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
  }

  babelHelpers.createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.scrollToItem(VIEW_INDEX);
      }, 0);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.scrollToItem(VIEW_INDEX);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedDate && this.props.selectedDate !== nextProps.selectedDate) {
        this.setState({ selectedMoment: nextProps.selectedDate });
      }
      if (nextProps.currentMonth) {
        this.setState({ currentMoment: (0, _moment2.default)(nextProps.currentMonth) });
      }
    }
  }, {
    key: 'getStack',
    value: function getStack(currentMoment) {
      if (this.props.scrollEnabled) {
        var i = -VIEW_INDEX;
        var res = [];

        for (i; i <= VIEW_INDEX; i++) {
          if (this.props.calendarFormat === 'monthly') {
            res.push((0, _moment2.default)(currentMoment).add(i, 'month'));
          } else {
            res.push((0, _moment2.default)(currentMoment).add(i, 'week'));
          }
        }
        return res;
      }
      return [(0, _moment2.default)(currentMoment)];
    }
  }, {
    key: 'prepareEventDates',
    value: function prepareEventDates(eventDates, events) {
      var parsedDates = {};

      if (events) {
        events.forEach(function (event) {
          if (event.date) {
            parsedDates[event.date] = event;
          }
        });
      } else {
        eventDates.forEach(function (event) {
          parsedDates[event] = {};
        });
      }

      return parsedDates;
    }
  }, {
    key: 'selectDate',
    value: function selectDate(date) {
      if (this.props.selectedDate === undefined) {
        this.setState({ selectedMoment: date,
          currentMoment: date });
      }
    }
  }, {
    key: 'selectAndJumpToToday',
    value: function selectAndJumpToToday() {
      var today = new Date();
      var newMoment = (0, _moment2.default)(this.state.currentMonthMoment).set('month', today.getMonth());
      this.setState({
        selectedMoment: today,
        currentMonthMoment: newMoment
      });
    }
  }, {
    key: 'scrollToItem',
    value: function scrollToItem(itemIndex) {
      var scrollToX = itemIndex * this.props.width;
      if (this.props.scrollEnabled && this._calendar) {
        this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false });
      }
    }
  }, {
    key: 'scrollEnded',
    value: function scrollEnded(event) {
      var position = event.nativeEvent.contentOffset.x;
      var currentPage = position / this.props.width;
      var newMoment = this.props.calendarFormat === 'monthly' ? (0, _moment2.default)(this.state.currentMoment).add(currentPage - VIEW_INDEX, 'month') : (0, _moment2.default)(this.state.currentMoment).add(currentPage - VIEW_INDEX, 'week');

      this.setState({ currentMoment: newMoment });

      if (currentPage < VIEW_INDEX) {
        this.props.onSwipePrev && this.props.onSwipePrev(newMoment);
      } else if (currentPage > VIEW_INDEX) {
        this.props.onSwipeNext && this.props.onSwipeNext(newMoment);
      }
    }
  }, {
    key: 'getStartMoment',
    value: function getStartMoment(calFormat, currMoment) {
      var weekStart = this.props.weekStart;

      var res = void 0;
      if (calFormat === 'monthly') {
        res = (0, _moment2.default)(currMoment).startOf('month');
      } else {
        var sundayMoment = (0, _moment2.default)(currMoment).startOf('week');
        if (weekStart > 0) {
          res = (0, _moment2.default)(currMoment).isoWeekday(weekStart);
          if (res.diff(currMoment) > 0) {
            res = (0, _moment2.default)(currMoment).subtract(7, 'day').isoWeekday(weekStart);
          }
        } else {
          res = sundayMoment;
        }
      }
      return res;
    }
  }, {
    key: 'renderCalendarView',
    value: function renderCalendarView(calFormat, argMoment, eventsMap) {
      var _this3 = this;

      var renderIndex = 0,
          weekRows = [],
          days = [];

      var startOfArgMoment = this.getStartMoment(calFormat, argMoment),
          selectedMoment = (0, _moment2.default)(this.state.selectedMoment),
          weekStart = this.props.weekStart,
          todayMoment = (0, _moment2.default)(this.props.today),
          todayIndex = todayMoment.date() - 1,
          argDaysCount = calFormat === 'monthly' ? argMoment.daysInMonth() : 7,
          offset = calFormat === 'monthly' ? (startOfArgMoment.isoWeekday() - weekStart + 7) % 7 : 0,
          selectedIndex = (0, _moment2.default)(selectedMoment).date() - 1;

      var _loop = function _loop() {
        var dayIndex = renderIndex - offset;
        var isoWeekday = (renderIndex + weekStart) % 7;
        var thisMoment = (0, _moment2.default)(startOfArgMoment).add(dayIndex, 'day');

        if (dayIndex >= 0 && dayIndex < argDaysCount) {
          days.push(_react2.default.createElement(_Day2.default, {
            startOfMonth: startOfArgMoment,
            isWeekend: isoWeekday === 0 || isoWeekday === 6,
            key: '' + renderIndex,
            onPress: function onPress() {
              _this3.selectDate(thisMoment);
              _this3.props.onDateSelect && _this3.props.onDateSelect(thisMoment ? thisMoment.format() : null);
            },
            caption: '' + thisMoment.format('D'),
            isToday: todayMoment.format('YYYY-MM-DD') == thisMoment.format('YYYY-MM-DD'),
            isSelected: selectedMoment.isSame(thisMoment),
            event: eventsMap[thisMoment.format('YYYY-MM-DD')] || eventsMap[thisMoment.format('YYYYMMDD')],
            showEventIndicators: _this3.props.showEventIndicators,
            customStyle: _this3.props.customStyle,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 242
            }
          }));
        } else {
          days.push(_react2.default.createElement(_Day2.default, { key: '' + renderIndex, filler: true, customStyle: _this3.props.customStyle, __source: {
              fileName: _jsxFileName,
              lineNumber: 260
            }
          }));
        }
        if (renderIndex % 7 === 6) {
          weekRows.push(_react2.default.createElement(
            _reactNative.View,
            {
              key: weekRows.length,
              onLayout: weekRows.length ? undefined : _this3.onWeekRowLayout,
              style: [_styles2.default.weekRow, _this3.props.customStyle.weekRow],
              __source: {
                fileName: _jsxFileName,
                lineNumber: 264
              }
            },
            days
          ));
          days = [];
          if (dayIndex + 1 >= argDaysCount) {
            return 'break';
          }
        }
        renderIndex += 1;
      };

      do {
        var _ret2 = _loop();

        if (_ret2 === 'break') break;
      } while (true);
      var containerStyle = [_styles2.default.monthContainer, this.props.customStyle.monthContainer];
      return _react2.default.createElement(
        _reactNative.View,
        { key: startOfArgMoment.format('YYYY-MM-DD') + '-' + calFormat, style: containerStyle, __source: {
            fileName: _jsxFileName,
            lineNumber: 279
          }
        },
        weekRows
      );
    }
  }, {
    key: 'renderHeading',
    value: function renderHeading() {
      var headings = [];
      var i = 0;

      for (i; i < 7; ++i) {
        var j = (i + this.props.weekStart) % 7;
        headings.push(_react2.default.createElement(
          _reactNative.Text,
          {
            key: i,
            style: j === 0 || j === 6 ? [_styles2.default.weekendHeading, this.props.customStyle.weekendHeading] : [_styles2.default.dayHeading, this.props.customStyle.dayHeading],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 289
            }
          },
          this.props.dayHeadings[j]
        ));
      }

      return _react2.default.createElement(
        _reactNative.View,
        { style: [_styles2.default.calendarHeading, this.props.customStyle.calendarHeading], __source: {
            fileName: _jsxFileName,
            lineNumber: 301
          }
        },
        headings
      );
    }
  }, {
    key: 'renderTopBar',
    value: function renderTopBar() {
      var _this4 = this;

      var localizedMonth = this.props.monthNames[this.state.currentMoment.month()];
      return this.props.showControls ? _react2.default.createElement(
        _reactNative.View,
        { style: [_styles2.default.calendarControls, this.props.customStyle.calendarControls], __source: {
            fileName: _jsxFileName,
            lineNumber: 311
          }
        },
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: [_styles2.default.controlButton, this.props.customStyle.controlButton],
            onPress: this.onPrev,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 312
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: [_styles2.default.controlButtonText, this.props.customStyle.controlButtonText], __source: {
                fileName: _jsxFileName,
                lineNumber: 316
              }
            },
            this.props.prevButtonText
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          { style: _styles2.default.title, onPress: function onPress() {
              return _this4.props.onTitlePress && _this4.props.onTitlePress();
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 320
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: [_styles2.default.titleText, this.props.customStyle.title], __source: {
                fileName: _jsxFileName,
                lineNumber: 321
              }
            },
            localizedMonth,
            ' ',
            this.state.currentMoment.year()
          )
        ),
        _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: [_styles2.default.controlButton, this.props.customStyle.controlButton],
            onPress: this.onNext,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 325
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            { style: [_styles2.default.controlButtonText, this.props.customStyle.controlButtonText], __source: {
                fileName: _jsxFileName,
                lineNumber: 329
              }
            },
            this.props.nextButtonText
          )
        )
      ) : _react2.default.createElement(
        _reactNative.View,
        { style: [_styles2.default.calendarControls, this.props.customStyle.calendarControls], __source: {
            fileName: _jsxFileName,
            lineNumber: 336
          }
        },
        _react2.default.createElement(
          _reactNative.Text,
          { style: [_styles2.default.title, this.props.customStyle.title], __source: {
              fileName: _jsxFileName,
              lineNumber: 337
            }
          },
          this.state.currentMoment.format(this.props.titleFormat)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var calendarDates = this.getStack(this.state.currentMoment);
      var eventDatesMap = this.prepareEventDates(this.props.eventDates, this.props.events);
      var numOfWeeks = this.props.calendarFormat === 'weekly' ? 1 : getNumberOfWeeks(this.state.currentMonthMoment, this.props.weekStart);

      return _react2.default.createElement(
        _reactNative.View,
        { style: [_styles2.default.calendarContainer, this.props.customStyle.calendarContainer], __source: {
            fileName: _jsxFileName,
            lineNumber: 351
          }
        },
        this.renderTopBar(),
        this.renderHeading(this.props.titleFormat),
        this.props.scrollEnabled ? _react2.default.createElement(
          _reactNative.ScrollView,
          {
            ref: function ref(calendar) {
              return _this5._calendar = calendar;
            },
            horizontal: true,
            scrollEnabled: true,
            pagingEnabled: true,
            removeClippedSubviews: this.props.removeClippedSubviews,
            scrollEventThrottle: 1000,
            showsHorizontalScrollIndicator: false,
            automaticallyAdjustContentInsets: false,
            onMomentumScrollEnd: function onMomentumScrollEnd(event) {
              return _this5.scrollEnded(event);
            },
            style: {
              height: this.state.rowHeight ? this.state.rowHeight * numOfWeeks : null
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 355
            }
          },
          calendarDates.map(function (date) {
            return _this5.renderCalendarView(_this5.props.calendarFormat, (0, _moment2.default)(date), eventDatesMap);
          })
        ) : _react2.default.createElement(
          _reactNative.View,
          { ref: function ref(calendar) {
              return _this5._calendar = calendar;
            }, __source: {
              fileName: _jsxFileName,
              lineNumber: 372
            }
          },
          calendarDates.map(function (date) {
            return _this5.renderCalendarView(_this5.props.calendarFormat, (0, _moment2.default)(date), eventDatesMap);
          })
        )
      );
    }
  }]);
  return Calendar;
}(_react.Component), _class.propTypes = {
  currentMonth: _react.PropTypes.any,
  customStyle: _react.PropTypes.object,
  dayHeadings: _react.PropTypes.array,
  eventDates: _react.PropTypes.array,
  monthNames: _react.PropTypes.array,
  nextButtonText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  onDateSelect: _react.PropTypes.func,
  onSwipeNext: _react.PropTypes.func,
  onSwipePrev: _react.PropTypes.func,
  onTouchNext: _react.PropTypes.func,
  onTouchPrev: _react.PropTypes.func,
  onTitlePress: _react.PropTypes.func,
  prevButtonText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  removeClippedSubviews: _react.PropTypes.bool,
  scrollEnabled: _react.PropTypes.bool,
  selectedDate: _react.PropTypes.any,
  showControls: _react.PropTypes.bool,
  showEventIndicators: _react.PropTypes.bool,
  startDate: _react.PropTypes.any,
  titleFormat: _react.PropTypes.string,
  today: _react.PropTypes.any,
  weekStart: _react.PropTypes.number,
  calendarFormat: _react.PropTypes.string
}, _class.defaultProps = {
  customStyle: {},
  width: DEVICE_WIDTH,
  dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  eventDates: [],
  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  nextButtonText: 'Next',
  prevButtonText: 'Prev',
  removeClippedSubviews: true,
  scrollEnabled: false,
  showControls: false,
  showEventIndicators: false,
  startDate: (0, _moment2.default)().format('YYYY-MM-DD'),
  titleFormat: 'MMMM YYYY',
  weekStart: 1,
  calendarFormat: 'monthly' }, _temp2);
exports.default = Calendar;