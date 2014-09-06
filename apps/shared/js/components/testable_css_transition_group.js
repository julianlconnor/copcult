/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

  var TestableCSSTransitionGroup = React.createClass({

    getDefaultProps: function() {
      var shouldTransition = !(window.venmo.ENV === 'karma');

      return {
        transitionEnter: shouldTransition,
        transitionLeave: shouldTransition
      };
    },

    render: function() {
      return this.transferPropsTo(
        <ReactCSSTransitionGroup>
          {this.props.children}
        </ReactCSSTransitionGroup>
      );
    }

  });

  return TestableCSSTransitionGroup;

});
