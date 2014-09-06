/** @jsx React.DOM */

define([
  'react',
  'shared/js/helpers/cdn'
], function(React, cdn) {

  var FBAuthed = React.createClass({

    getFacebookPhotoURL: function() {
      return '//graph.facebook.com/' + this.props.user.id + '/picture?width=140&height=140';
    },

    getFacebookPhoto: function() {
      if ( this.props.user && this.props.user.id ) {
        return (
          <img
            className="photo"
            onLoad={this.handleImageLoaded}
            src={this.getFacebookPhotoURL()} />
        );
      }
    },

    handleImageLoaded: function() {
      if ( this.props.onImageLoaded ) {
        this.props.onImageLoaded();
      }
    },

    handleLogOut: function() {
      this.props.onLogOut();
    },

    render: function() {
      if( this.props.noOutlineVersion ) {
        return (
          <div className="fb-authed clearfix">
            <div className="fb-photo-section">
              {this.getFacebookPhoto()}
              <img className="fb-logo-circle"
                src={cdn.imagePath('FBLogoCircle@2x.png')} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="fb-authed fb-authed-outline clearfix">
            <div className="fb-photo-section">
              {this.getFacebookPhoto()}
              <img className="fb-logo-circle"
                src={cdn.imagePath('FBLogoCircle@2x.png')} />
            </div>
          </div>
        );
      }
    }
  });

  return FBAuthed;
});
