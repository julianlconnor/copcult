/** @jsx React.DOM */

define([
  'react',

  'jsx!app/js/components/storefront/create',

  'shared/js/models/user'
], function(React, CreateStorefront, User) {

  var user = new User(window.arbiter.user);

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        media: [],
        fetching: false,
        creatingStorefront: false
      };
    },

    createStorefrontFlow: function(item) {
      this.setState({
        creatingStorefront: true,
        instagramPost: item
      });
    },

    componentWillMount: function() {
      this.setState({
        fetching: true
      });

      return user.fetchMedia().then(function(media) {
        var items = media.map(function(item) {
          console.log(item);
          return <li><img onClick={this.createStorefrontFlow.bind(null, item)} src={item.images.thumbnail.url} /></li>;
        }.bind(this));

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

      if ( this.state.creatingStorefront ) {
        return <CreateStorefront item={this.state.instagramPost} />;
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
