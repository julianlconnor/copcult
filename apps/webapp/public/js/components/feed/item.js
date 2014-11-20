/** @jsx React.DOM */

define([
  'react'

], function(React) {

  var FeedItem = React.createClass({
    render: function() {
      var data = this.props.data;

      return (
        <li>
          <img src={data.standardResolution} />
          <p className="small">{data.caption}</p>
        </li>
      );
    }
  });

  return FeedItem;
});

