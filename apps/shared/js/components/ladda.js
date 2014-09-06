/** @jsx React.DOM */

define([
  'react',
  'ladda'
], function(React, Ladda) {

  /**
   * Very simple wrapper around Ladda.
   */

  var LaddaButton = React.createClass({

    propTypes: {
      // Indicates if the button is spinning
      spinning: React.PropTypes.bool,

      // Indicates if the button is disabled
      disabled: React.PropTypes.bool,

      // A Ladda button style to apply
      'data-style': React.PropTypes.string,

      // Extra classes to apply to the button (beyond .ladda-button)
      buttonClasses: React.PropTypes.string
    },

    componentDidMount: function() {
      var laddaButton = Ladda.create(this.refs.button.getDOMNode());
      this.setState({
        laddaButton: laddaButton
      });
    },

    componentWillUpdate: function(nextProps) {
      if ( this.props.spinning !== nextProps.spinning ) {
        if ( nextProps.spinning ) {
          this.state.laddaButton.start();
        } else {
          this.state.laddaButton.stop();
        }
      }
    },

    render: function() {
      var classes = 'ladda-button ' + this.props.buttonClasses;

      var button = (
        <button className={classes} ref="button">
          <span className="ladda-label">
            {this.props.children}
          </span>
        </button>
      );

      return this.transferPropsTo(button);
    }
  });

  return LaddaButton;

});
