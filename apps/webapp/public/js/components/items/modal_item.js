/** @jsx React.DOM */

var url = require('url');
var React = require('react');

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
    var item = this.props.item;
    var source = url.parse(item.url).host.replace('www.', '');

    if ( item.toJSON ) {
      item = item.toJSON();
    }

    return (
      <div className={'item-wrapper-modal item-' + item.id} key={item.id}>
        <h3>{item.name}</h3>
        <img src={item.image} />
        <div>
          <h4>Buy new via <a href={item.url} className="small" target="_blank">{source}</a></h4>
          {/* Add price for new */}
          <div className="glyphicon glyphicon-new-window"></div>
        </div>
        <div>
          <h4>Buy used via <a href="https://www.grailed.com" className="small" target="_blank">grailed.com</a></h4>
          <div className="glyphicon glyphicon-new-window"></div>
        </div>
        {/* Add price for used */}
        <h4>User pics, instagram tag <small>#copcult-{item.id}</small></h4>
      </div>
    );
  }

});

module.exports = Item;

