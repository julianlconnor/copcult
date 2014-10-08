/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var Item = React.createClass({

    render: function() {
      var item = this.props.item;

      if ( item.toJSON ) {
        item = this.props.item.toJSON();
      }

      return (
        <div className={'item-wrapper item-' + item.id} key={item.id}>
          <a href={item.url} target="_blank">
            <img src={item.image} className="img-circle" style={ { width: '100px' } }/>
            <div>
              <h3>{item.name}</h3>
            </div>
          </a>
        </div>
      );
    }

  });

  return Item;

});

