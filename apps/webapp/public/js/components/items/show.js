/** @jsx React.DOM */

var url = require('url');
var React = require('react');

var ShowItem = React.createClass({
  
  render: function() {
    var item = this.props.item;
    var source = url.parse(item.url).host.replace('www.', '');

    var brandEl = item.brand.name ? <a href={'/brands/' + item.brand.id} className="small">by {item.brand.name}</a> : null;

    return (
      <div className={'item-wrapper-modal item-' + item.id} key={item.id}>
        <div className="top-wrapper">
          <h3>{item.name} {brandEl}</h3>
          <a className="small" onClick={this.props.onEdit}>Item missing data? Click here to edit.</a>
        </div>

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

module.exports = ShowItem;

