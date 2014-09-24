/** @jsx React.DOM */

define([
  'q',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/storefront/create',

  'shared/js/models/user'
], function(q, React, _, CreateStorefront, User) {

  var user = new User(window.jaded.user);

  var HomeView = React.createClass({

    getInitialState: function() {
      return {
        instagramPosts: [],
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
        user.fetchInstagramPosts(),
        user.fetchStorefronts()
      ]).spread(function(instagramPosts, storefronts) {
        /**
        * Filter out instagram posts that are associated to storefronts.
        */

        function isAStorefront(instagramPost) {
          /**
          * Default flag to true because the default case is that we want to
          * keep the item. Only remove it if it is found in storefronts.
          */
          var flag = true;

          _.each(storefronts, function(storefront) {
            if ( instagramPost.id === storefront.instagramMediaId ) {
              flag = false;
            }
          });

          return flag;
        }
        instagramPosts = _.filter(instagramPosts, isAStorefront);

        /**
        * Create elements out of the remaining elements.
        */
        instagramPosts = instagramPosts.map(function(instagramPost) {
          return (
            <li>
              <img onClick={this.createStorefrontFlow.bind(null, instagramPost)} src={instagramPost.images.thumbnail.url} />
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
          instagramPosts: instagramPosts,
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
            {this.state.instagramPosts}
          </ul>
        </div>
      );
    }
  });

  return HomeView;

});
