'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var StaticContainer = (_temp = _class = function (_React$Component) {
  babelHelpers.inherits(StaticContainer, _React$Component);

  function StaticContainer() {
    babelHelpers.classCallCheck(this, StaticContainer);
    return babelHelpers.possibleConstructorReturn(this, (StaticContainer.__proto__ || Object.getPrototypeOf(StaticContainer)).apply(this, arguments));
  }

  babelHelpers.createClass(StaticContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !!nextProps.shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return children ? _react2.default.Children.only(children) : null;
    }
  }]);
  return StaticContainer;
}(_react2.default.Component), _class.propTypes = {
  shouldUpdate: _react.PropTypes.bool
}, _temp);
exports.default = StaticContainer;