/** @jsx React.DOM */

define([
  'q',
  'react',
  'underscore',

  'jsx!app/js/components/storefront/create',

  'shared/js/models/user'
], function(q, React, _, CreateStorefront, User) {

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

      return q.all([
        user.fetchMedia(),
        user.fetchStorefronts()
      ]).spread(function(media, storefronts) {
        /**
        * Filter out media that already has a storefront.
        */
        var items;
        var potentialStorefronts;

        function isAStorefront(image) {
          /**
          * Default flag to true because the default case is that we want to
          * keep the item. Only remove it if it is found in storefronts.
          */
          var flag = true;

          _.each(storefronts, function(storefront) {
            if ( image.id === storefront.instagramMediaId ) {
              flag = false;
            }
          });

          return flag;
        }

        potentialStorefronts = _.filter(media, isAStorefront);
        /**
        * Create elements out of the remaining elements.
        */
        items = potentialStorefronts.map(function(item) {
          return (
            <li>
              <img onClick={this.createStorefrontFlow.bind(null, item)} src={item.images.thumbnail.url} />
            </li>
          );
        }.bind(this));
        storefronts = storefronts.map(function(storefront) {
          return (
            <li>
              <img src={storefront.instagramMediaImageUrl} />
            </li>
          );
        });


        this.setState({
          media: items,
          storefronts: storefronts,
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
          <h3>Your Storefronts</h3>
          <ul>
            {this.state.storefronts}
          </ul>
          <h3>Your Posts</h3>
          <ul>
            {this.state.media}
          </ul>
        </div>
      );
    }
  });

  return HomeView;

});
