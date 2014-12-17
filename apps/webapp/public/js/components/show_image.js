/** @jsx React.DOM */

var React = require('react');

var AddItem = require('./items/add');
var Image = require('./images/image');
var ImageItems = require('./image_items');
var ImageComments = require('./image_comments');

var Caption = require('./caption');

var ShowImage = React.createClass({

  mixins: [
    React.BackboneMixin('imageModel')
  ],

  addItem: function(data) {
    return this.props.imageModel.addItem(data);
  },

  deleteItem: function(item) {
    return this.props.imageModel.deleteItem(item);
  },

  render: function() {
    return (
      <div className="row show-image">
        <div className="seven columns">
          <Image imageModel={this.props.imageModel} />
          <Caption text={this.props.imageModel.get('caption')} />
          <ImageComments imageId={this.props.imageModel.id} comments={this.props.imageModel.get('comments')} />
        </div>
        <div className="five columns">
          <ImageItems items={this.props.imageModel.get('items')} onDelete={this.deleteItem} />
          <AddItem handleSubmit={this.addItem} />
        </div>
      </div>
    );
  }

});

module.exports = ShowImage;
