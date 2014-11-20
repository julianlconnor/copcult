/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/feed/item'
], function(React, FeedItem) {

  var Feed = React.createClass({
    render: function() {
      var feedItems = this.props.feed.map(function(feedItem) {
        return <FeedItem data={feedItem} />;
      });

      return (
        <ul className="feed-items">
          {feedItems}
        </ul>
      );
    }
  });

  return Feed;
});

