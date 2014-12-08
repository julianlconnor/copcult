/** @jsx React.DOM */

var React = require('react');

var ajax = require('ajax');

var EditItem = React.createClass({

  updateItem: function(evt) {
    evt.preventDefault();

    var brand = this.refs.brand.getDOMNode().value;
    var name = this.refs.name.getDOMNode().value;
    var url = this.refs.url.getDOMNode().value;

    return ajax({
      url: '/api/v1/items/' + this.props.item.id,
      type: 'PUT',
      data: {
        url: url,
        name: name,
        brand: brand
      }
    }).then(this.props.doneEditingItem);
  },
  
  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.updateItem}>
        <p onClick={this.props.doneEditingItem}>Back</p>
        <div className="form-group">
          <label for="input-brand" className="col-sm-2 control-label">Brand</label>
          <div className="col-sm-10">
            <input ref="brand" type="text" className="form-control" id="input-brand" placeholder="Brand" defaultValue={this.props.item.brand.name} />
          </div>
        </div>

        <div className="form-group">
          <label for="input-name" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input ref="name" type="text" className="form-control" id="input-name" placeholder="Name" defaultValue={this.props.item.name} />
          </div>
        </div>

        <div className="form-group">
          <label for="input-link" className="col-sm-2 control-label">Link</label>
          <div className="col-sm-10">
            <input ref="url" type="url" className="form-control" id="input-link" placeholder="Link" defaultValue={this.props.item.url} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-default">Update item</button>
          </div>
        </div>
      </form>
    );
  }

});

module.exports = EditItem;
