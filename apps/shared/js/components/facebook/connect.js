/** @jsx React.DOM */

/* global FB */

define([
  'react',

  'shared/js/helpers/mixpanel',
  'shared/js/helpers/facebook_loaded',

  'jsx!shared/js/components/facebook/button',
  'jsx!shared/js/components/facebook/authed'

], function(React, mixpanel, fbLoaded, FBConnectButton, FBAuthed) {

  /*
  * This component was split into three separate React classes - one for the
  * "unauthed" view with the "connect to facebook" button (FbConnect), one for
  * the "authed" view (FbAuthed), and a wrapper.
  *
  * This seems to be the easiest way to structure what would be, in Ember:
  *   {{#if authed}}
  *     [a whole bunch of template]
  *   {{else}}
  *     [another whole bunch of template]
  *   {{/else}}
  *
  * Here, it's:
  *   {authed ? <FbAuthed> : <FbConnect>}
  */

  return React.createClass({
    displayName: 'FbConnectWidget',

    componentDidMount: function() {

      if ( this.props.openLoginImmediately ) {
        this.handleAuthRequest();
        return;
      }

      fbLoaded.then(function(FB) {
        FB.getLoginStatus(function(response) {
          this.handleGetLoginStatus(response);
        }.bind(this));
      }.bind(this));

    },

    handleGetLoginStatus: function(response) {
      if ( response.status === 'connected' ) {
        this.handleUserAuthed(response.authResponse);
      } else {
        this.props.onNoLogin();
      }
    },

    handleAuthRequest: function() {
      var fbPermissions = 'user_birthday, email, publish_actions';

      window.FB.login(function(response) {
        if ( response.authResponse ) {
          this.handleUserAuthed(response.authResponse);
        } else {
          mixpanel.track('SIGNUP_FACEBOOK_ADDED', { permission: 'none' });
        }
      }.bind(this), {scope: fbPermissions});
    },

    handleLogOut: function() {
      var logOut = function() {
        FB.logout(function() {
          this.props.onLoggedOut();
          this.setState({ auth: null });
          mixpanel.track('SIGNUP_FACEBOOK_REMOVED');
        }.bind(this));
      }.bind(this);

      // UBER-HACK:
      // There are cases where the FB SDK hasn't correctly set the access token internally
      // (i.e. the signup-homepage iframe flow), so to be able to log out, we actually have to
      // *log in* first
      if ( !FB.getAccessToken() ) {
        FB.login(logOut);
      } else {
        logOut();
      }
    },

    handleUserAuthed: function(authResponse) {
      this.props.onAuthed(authResponse);

      fbLoaded.then(function(FB) {
        FB.api('/me', function(response) {
          this.setState({ auth: response });
          this.props.onGotUser(response);

          // fetch permissions so we can track what was granted in mixpanel
          FB.api('/me/permissions', function(response) {
            var permission = response.data[0]['publish_actions'] ? 'write' : 'read';
            mixpanel.track('SIGNUP_FACEBOOK_ADDED', { permission: permission });
          });
        }.bind(this), { access_token: authResponse.accessToken });
      }.bind(this));
    },

    getInitialState: function() {
      return { auth: undefined };
    },

    isAuthed: function() {
      return !!this.state.auth;
    },

    render: function() {
      if ( this.props.displayAuthedUser && this.isAuthed() ) {
        return (
          <div>
            <FBAuthed
              user={this.state.auth}
              onLogOut={this.handleLogOut}
              onImageLoaded={this.props.onImageLoaded}
              noOutlineVersion={this.props.noOutlineVersion} />
          </div>
        );
      }
      return (
        <div>
          <FBConnectButton onAuth={this.handleAuthRequest}
                     noOutlineVersion={this.props.noOutlineVersion}
                     handleClick={this.props.handleClick} />
        </div>
      );
    }
  });

});
