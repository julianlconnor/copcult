/** @jsx React.DOM */

var url = require('url');
var React = require('react');
var Modal = require('react-modal');

var ModalItem = require('./modal_item');

var Item = React.createClass({

  getInitialState: function() {
    return {
      modalIsOpen: false
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

  render: function() {
    var brandEl;
    var item = this.props.item;
    var source = url.parse(item.url).host.replace('www.', '');

    if ( item.toJSON ) {
      item = item.toJSON();
    }

    if ( item.brand && item.brand.name ) {
      brandEl = <p>by {item.brand.name} <span className="small">via {source}</span></p>;
    } else {
      brandEl = <span className="small">via {source}</span>;
    }

    return (
      <div className={'item-wrapper item-' + item.id} key={item.id}>
        <a onClick={this.openModal}>
          <div>
            <h3>{item.name}</h3>
            {brandEl}
          </div>
        </a>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <ModalItem item={this.props.item} />
        </Modal>
      </div>
    );
  }

});

module.exports = Item;

