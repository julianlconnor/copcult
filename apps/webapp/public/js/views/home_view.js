/** @jsx React.DOM */

define([
  'react',

  'shared/js/models/user'
], function(React, User) {

  var user = new User(window.arbiter.user);

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        media: [],
        fetching: false
      };
    },

    componentWillMount: function() {
      this.setState({
        fetching: true
      });

      return user.fetchMedia().then(function(media) {
        var items = media.map(function(item) {
          return <li><img src={item.images.thumbnail.url} /></li>;
        });

        this.setState({
          media: items,
          fetching: false
        });
      }.bind(this));
    },

    render: function() {
      if ( this.state.fetching ) {
        return <h3>Loading..</h3>;
      }

      return (
        <div>
          <h1>Welcome back {user.get('instagramUsername')}</h1>
          {this.state.media}
        </div>
      );
    }
  });

  return HomeView;

});
