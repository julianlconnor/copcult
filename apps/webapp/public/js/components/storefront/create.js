/** @jsx React.DOM */

define([
  'bluebird',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/storefront/addItems',

  'webapp/public/js/helpers/ajax'
], function(Promise, React, _, AddItems, ajax) {

  var CreateStorefront = React.createClass({

    getInitialState: function() {
      return {
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

      var items = this.state.storefrontUrls.map(function(url) {
        return ajax({
          type: 'POST',
          url: '/api/v1/items',
          data: {
            url: url
          }
        });
      });

      return Promise.all(items).spread(function() {
        var itemIDs = _.map(arguments, function(item) {
          return item.id;
        });

        var caption = this.props.item.caption ? this.props.item.caption.text : '';
        var data = {
          instagramMediaID: this.props.item.id,
          instagramMediaImageUrl: this.props.item.images.standard_resolution.url,
          instagramMediaCaption: caption,
          items: itemIDs
        };

        return ajax({
          type: 'POST',
          url: '/api/v1/storefronts',
          data: data
        }).then(this.redirectToStorefront,
                this.handleError);
      }.bind(this));
    },

    handleUrlAdded: function(url) {
      this.setState({
        storefrontUrls: this.state.storefrontUrls.concat([url])
      });
    },

    renderUrls: function() {
      return this.state.storefrontUrls.map(function(url) {
        return (
          <li>
            <a href={url} target="_blank">{url}</a>
          </li>
        );
      });
    },

    render: function() {
      return (
        <div>
          <form className="create-storefront" onSubmit={this.createStorefront}>
            <h1>Creating a storefront!</h1>
            <img src={this.props.item.images.thumbnail.url} />
            <ul className="storefront-items">{this.renderUrls()}</ul>
            <AddItems handleUrlAdded={this.handleUrlAdded} urls={this.state.storefrontUrls} />
            <button>Create</button>
          </form>
        </div>
      );
    }

  });

  return CreateStorefront;

});
