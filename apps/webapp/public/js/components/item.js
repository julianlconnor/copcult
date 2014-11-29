/** @jsx React.DOM */

var React = require('react');

var Item = React.createClass({

  render: function() {
    var item = this.props.item;

    if ( item.toJSON ) {
      item = item.toJSON();
    }

    return (
      <div className={'item-wrapper item-' + item.id} key={item.id}>
        <a href={item.url} target="_blank">
          <img src={item.image} className="img-circle" style={ { width: '75px' } }/>
          <div>
            <h3>{item.name}</h3>
            <p className="small">{item.url}</p>
          </div>
        </a>
      </div>
    );
  }

});

module.exports = Item;

