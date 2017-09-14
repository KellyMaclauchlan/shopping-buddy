Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require('react-native');

var DEVICE_WIDTH = _reactNative.Dimensions.get('window').width;

var styles = _reactNative.StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#f7f7f7'
  },
  monthContainer: {
    width: DEVICE_WIDTH
  },
  calendarControls: {
    flexDirection: 'row'
  },
  controlButton: {},
  controlButtonText: {
    margin: 10,
    fontSize: 15
  },
  title: {
    flex: 1,
    margin: 10
  },
  titleText: {
    textAlign: 'center',
    fontSize: 15
  },
  calendarHeading: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  dayHeading: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5
  },
  weekendHeading: {
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
    color: '#cccccc'
  },
  weekRow: {
    flexDirection: 'row'
  },
  weekendDayButton: {
    backgroundColor: '#fafafa'
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
    width: DEVICE_WIDTH / 7,
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9'
  },
  dayButtonFiller: {
    padding: 5,
    width: DEVICE_WIDTH / 7
  },
  day: {
    fontSize: 16,
    alignSelf: 'center'
  },
  eventIndicatorFiller: {
    marginTop: 3,
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2
  },
  eventIndicator: {
    backgroundColor: '#cccccc'
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
    borderRadius: 14
  },
  currentDayCircle: {
    backgroundColor: 'red'
  },
  currentDayText: {
    color: 'red'
  },
  selectedDayCircle: {
    backgroundColor: 'black'
  },
  hasEventCircle: {},
  hasEventDaySelectedCircle: {},
  hasEventText: {},
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold'
  },
  weekendDayText: {
    color: '#cccccc'
  }
});

exports.default = styles;