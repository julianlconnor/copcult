/** @jsx React.DOM */

var React = require('react');

var EditItem = require('./edit');
var ShowItem = require('./show');

var ModalItem = React.createClass({

  getInitialState: function() {
    return {
      modalIsOpen: false,
      editItem: false
    };
  },

  openModal: function(evt) {
    evt.preventDefault();

    this.setState({
      modalIsOpen: true
    });
  },

  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
  },

  editItem: function() {
    this.setState({
      editItem: true
    });
  },

  doneEditingItem: function() {
    this.setState({
      editItem: false
    });
  },

  render: function() {
    var contents;

    if ( this.state.editItem ) {
      contents = <EditItem itemModel={this.props.itemModel} doneEditingItem={this.doneEditingItem} />;
    } else {
      contents = <ShowItem itemModel={this.props.itemModel} onEdit={this.editItem} />;
    }

    return (
      <div className="item-wrapper-modal-wrapper">
        {contents}
      </div>
    );
  }

});

module.exports = ModalItem;

