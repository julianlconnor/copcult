/** @jsx React.DOM */

define([
  'react',
  'shared/js/helpers/mixpanel',
], function(React, mixpanel) {

  var FBConnectButton = React.createClass({
    handleClick: function(e) {
      e.preventDefault();

      mixpanel.track('FACEBOOK_CONNECT_CLICK');

      if ( this.props.onClick ) {
        this.props.onClick();
      }

      if ( this.props.onAuth ) {
        this.props.onAuth();
      }
    },

    render: function() {
      if ( this.props.noOutlineVersion ) {
        return (
          <p>
            <a onClick={this.handleClick}>Connect Facebook</a> to make
            <br/>this easier.
          </p>
        );
      } else {
        return (
          <button className="ladda-button facebook button blue cta outline"
            data-style="slide-right" onClick={this.handleClick}>
            <span className="ladda-label">Sign up with Facebook</span>
          </button>
        );
      }
    }
  });

  return FBConnectButton;
});
