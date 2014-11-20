/** @jsx React.DOM */

define([
  'bluebird',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/feed/feed',

  'webapp/public/js/models/user'
], function(Promise, React, _, Feed, User) {

  var user = new User(window.jaded.user);

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        feed: [],
        fetching: false
      };
    },

    componentWillMount: function() {
      this.setState({
        fetching: true
      });

      user.fetchFeed().then(function(feed) {
        this.setState({
          feed: feed,
          fetching: false
        });
      }.bind(this));
    },

    render: function() {

      if ( this.state.fetching ) {
        return <h3>Loading..</h3>;
      }

      return <Feed feed={this.state.feed} />;
    }
  });

  return HomeView;

});
