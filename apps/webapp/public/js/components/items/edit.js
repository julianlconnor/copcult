/** @jsx React.DOM */

var React = require('react');

var EditItem = React.createClass({
  
  render: function() {
    return (
      <form onSubmit={this.updateItem}>
        <p onClick={this.props.doneEditingItem}>Back</p>
        <fieldset>

          <div className="input-wrapper">
            <input ref="brand" placeholder="Brand name" />
          </div>
          
          <div className="input-wrapper">
            <input ref="name" placeholder="Item name" />
          </div>

          <div className="input-wrapper">
            <input ref="url" placeholder="Link" />
          </div>

        </fieldset>

        <button className="btn btn-default">Update item</button>
      </form>
    );
  }

});

module.exports = EditItem;
