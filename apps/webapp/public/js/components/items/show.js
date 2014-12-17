/** @jsx React.DOM */

var url = require('url');
var React = require('react');

var ShowItem = React.createClass({

  mixins: [
    React.BackboneMixin('itemModel')
  ],
  
  render: function() {
    var item = this.props.itemModel;
    var source = url.parse(item.get('url')).host.replace('www.', '');

    var brandEl = item.get('brand').name ? <a href={'/brands/' + item.get('brand').id} className="small">by {item.get('brand').name}</a> : null;

    return (
      <div className={'item-wrapper-modal item-' + item.id} key={item.id}>
        <div className="top-wrapper">
          <h4>{item.get('name')} {brandEl}</h4>
          <a className="small" onClick={this.props.onEdit}>Item missing data? Click here to edit.</a>
          <a className="small" onClick={this.props.onDelete}>Delete</a>
        </div>

        <img src={item.get('image')} />
        <div>
          <p>Buy new via <a href={item.get('url')} className="small" target="_blank">{source}</a></p>
          {/* Add price for new */}
          <div className="glyphicon glyphicon-new-window"></div>
        </div>
        <div>
          <p>Buy used via <a href="https://www.grailed.com" className="small" target="_blank">grailed.com</a></p>
          <div className="glyphicon glyphicon-new-window"></div>
        </div>
        {/* Add price for used */}
        <p>User pics, instagram tag <small>#copcult-{item.id}</small></p>

      </div>
    );
  }

});

module.exports = ShowItem;

