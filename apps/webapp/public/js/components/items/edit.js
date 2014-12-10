/** @jsx React.DOM */

var React = require('react');

var ajax = require('ajax');

var EditItem = React.createClass({

  updateItem: function(evt) {
    evt.preventDefault();

    var brand = this.refs.brand.getDOMNode().value;
    var name = this.refs.name.getDOMNode().value;
    var url = this.refs.url.getDOMNode().value;

    return this.props.itemModel.update({
      url: url,
      name: name,
      brand: brand
    }).then(this.props.doneEditingItem);
  },
  
  render: function() {
    return (
      <form onSubmit={this.updateItem}>
        <p onClick={this.props.doneEditingItem}>Back</p>
        <div className="row">
          <label for="input-brand" className="u-full-width">Brand</label>
          <input ref="brand" type="text" className="u-full-width" id="input-brand"
              placeholder="Brand" defaultValue={this.props.itemModel.get('brand').name} />
        </div>

        <div className="row">
          <label for="input-name" className="u-full-width">Name</label>
          <input ref="name" type="text" className="u-full-width" id="input-name"
              placeholder="Name" defaultValue={this.props.itemModel.get('name')} />
        </div>

        <div className="row">
          <label for="input-link" className="u-full-width">Link</label>
          <input ref="url" type="text" className="u-full-width" id="input-link"
              placeholder="Link" defaultValue={this.props.itemModel.get('url')} />
        </div>

        <div className="row">
          <button className="u-full-width">Update item</button>
        </div>

      </form>
    );
  }

});

module.exports = EditItem;
