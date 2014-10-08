/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var Item = React.createClass({

    render: function() {
      var item = this.props.item;

      return (
        <div className={'item-wrapper item-' + item.id} key={item.id}>
          <a href={item.url} target="_blank">
            <img src={item.image} className="img-circle" />
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

