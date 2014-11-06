/** @jsx React.DOM */

define([
  'bluebird',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/storefront/add_items',

  'webapp/public/js/models/storefront'
], function(Promise, React, _, AddItems, Storefront) {

  var CreateStorefront = React.createClass({

    getInitialState: function() {
      return {
        storefront: new Storefront({
          instagramMediaID: this.props.item.id,
          instagramMediaImageUrl: this.props.item.images.standard_resolution.url,
          caption: this.props.item.caption ? this.props.item.caption.text : ''
        }),
        storefrontUrls: []
      };
    },

    redirectToStorefront: function() {
      window.location = '/' + window.jaded.user.instagramUsername;
    },

    createStorefront: function(event) {
      /**
      * TODO: replace with model
      */
      event.preventDefault();

      /**
      * Item IDs should all be saved by <AddItems />
      */
      return this.state.storefront.save().then(this.redirectToStorefront,
                                               this.handleError);
    },

    render: function() {
      return (
        <div>
          <form className="create-storefront" onSubmit={this.createStorefront}>
            <h1>Creating a storefront!</h1>
            <img src={this.props.item.images.thumbnail.url} />
            <AddItems storefront={this.state.storefront} />
            <button>Create</button>
          </form>
        </div>
      );
    }

  });

  return CreateStorefront;

});
