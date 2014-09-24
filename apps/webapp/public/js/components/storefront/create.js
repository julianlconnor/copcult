/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/storefront/addItems',

  'shared/js/helpers/ajax'
], function(React, AddItems, ajax) {

  var CreateStorefront = React.createClass({

    getInitialState: function() {
      return {
        storefrontItems: []
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

      var itemIDs = this.state.storefrontItems.map(function(item) {
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
    },

    addItem: function(item) {
      this.setState({
        storefrontItems: this.state.storefrontItems.concat([item])
      });
    },

    renderItems: function() {
      return this.state.storefrontItems.map(function(item) {
        return (
          <li>
            <div className={item.slug}>
              <a href={item.url} target="_blank">
                <img src={item.image} />{item.brand} - {item.name} - {item.price}
              </a>
            </div>
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
            <ul className="storefront-items">{this.renderItems()}</ul>
            <AddItems addItem={this.addItem} />
            <button>Create</button>
          </form>
        </div>
      );
    }

  });

  return CreateStorefront;

});
