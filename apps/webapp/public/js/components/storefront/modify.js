/** @jsx React.DOM */

define([
  'react',

  'jsx!webapp/public/js/components/item_modify',

  'webapp/public/js/helpers/ajax'
], function(React, ItemModify, ajax) {

  var CreateStorefront = React.createClass({

    deleteItem: function(item, event) {
      event.preventDefault();
      
      this.setState({
        spinning: true
      });

      return ajax({
        url: '/api/v1/storefronts/' + this.props.storefront.id + '/items/' + item.id,
        type: 'DELETE'
      }).then(function() {
        this.setState({
          spinning: false
        });
      }.bind(this));
    },

    renderItems: function() {
      return this.props.storefront.get('items').map(function(item) {
        return <ItemModify item={item} handleDelete={this.deleteItem} />;
      }.bind(this));
    },

    render: function() {
      var storefront = this.props.storefront;
      var style = {
        'background-image': 'url(' + storefront.get('instagramMediaImageUrl') + ')',
        'background-size': 'cover',
        'height': '500px'
      };

      return (
        <div>
          <h3>Modifying storefront</h3>
          <div className="storefront-row row">
            <div className="col-md-8" style={style}>
              <div>{storefront.get('instagramMediaCaption')}</div>
            </div>
            <div className="col-md-4">
              {this.renderItems()}
            </div>
          </div>
        </div>
      );
    }

  });

  return CreateStorefront;

});
