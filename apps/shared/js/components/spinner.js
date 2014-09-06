/** @jsx React.DOM */

define([
  'react',
  'spin'
], function(React, Spinner) {

  /**
   * Very simple wrapper around Ladda's spinner.
   */

  var LaddaSpinner = React.createClass({

    propTypes: {
      // Indicates if the spinner is showing
      show: React.PropTypes.bool,

      // Options passed to the spinner class
      options: React.PropTypes.object
    },

    getDefaultProps: function() {
      var defaults = {
        lines: 10,            // The number of lines to draw
        length: 5,            // The length of each line
        width: 2,             // The line thickness
        radius: 5,            // The radius of the inner circle
        rotate: 0,            // Rotation offset
        corners: 1,           // Roundness (0..1)
        color: '#000',        // #rgb or #rrggbb
        direction: 1,         // 1: clockwise, -1: counterclockwise
        speed: 1,             // Rounds per second
        trail: 100,           // Afterglow percentage
        opacity: 1/4,         // Opacity of the lines
        fps: 20,              // Frames per second when using setTimeout()
        zIndex: 2e9,          // Use a high z-index by default
        className: 'spinner', // CSS class to assign to the element
        top: 'auto',          // center vertically
        left: 'auto',         // center horizontally
        position: 'relative'  // element position
      };

      return {
        options: defaults
      };
    },

    componentDidMount: function() {
      var spinner = new Spinner(this.props.options);
      this.setState({
        spinner: spinner
      });

      if ( this.props.show ) {
        spinner.spin(this.refs.container.getDOMNode());
      }
    },

    componentDidUpdate: function() {
      if ( this.props.show ) {
        this.state.spinner.spin(this.refs.container.getDOMNode());
      } else {
        this.state.spinner.stop();
      }
    },

    render: function() {
      return this.props.show ?
        <div ref="container" className="spinner-container"></div> : <span />;
    }
  });

  return LaddaSpinner;

});
