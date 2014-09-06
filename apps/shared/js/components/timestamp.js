/** @jsx React.DOM */

define([
  'react',
  'jquery',
  'shared/js/helpers/format'
], function(React, $, format) {

  /**
   * This is a simple component for displaying timestamps.
   *
   * It can use a provided date to display a formatted version of the
   * date which can be updated on a given interval. It will also be
   * able to display the original date on hover.
   */

  var Timestamp = React.createClass({

    propTypes: {
      date: React.PropTypes.any.isRequired,
      updateInterval: React.PropTypes.number
    },

    getInitialState: function() {
      return {
        formattedTimestamp: format.elapsedTime(this.props.date)
      };
    },

    getDefaultProps: function() {
      return {
        updateInterval: 10000
      };
    },

    tick: function() {
      this.setState({
        formattedTimestamp: format.elapsedTime(this.props.date)
      });
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, this.props.updateInterval);
    },

    componentWillUnmount: function() {
      clearInterval(this.interval);
    },

    render: function() {
      return (
        <abbr className="timestamp" title={format.prettyDate(this.props.date)} >
          {this.state.formattedTimestamp}
        </abbr>
      );
    }
  });

  return Timestamp;
});

