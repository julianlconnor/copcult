/** @jsx React.DOM */
define([
  'backbone',
  'react',
  'shared/js/helpers/mixpanel',
  'shared/js/helpers/restartable_chain',
  'shared/js/config/messages',
  'jsx!shared/js/components/forms/signup_user_add',
  'jsx!shared/js/components/forms/homepage_user_add',
  'jsx!shared/js/components/facebook/connect',
  'jsx!shared/js/components/ladda',
  'react.backbone'
], function(Backbone, React, mixpanel, RestartableChain, msg, SignupUserAddView,
            HomepageUserAddView, FacebookConnect, LaddaButton) {

  var SignupWidget = React.createClass({

    propTypes: {
      user: React.PropTypes.object.isRequired,
      openFbLoginImmediately: React.PropTypes.bool,
      handleSuccess: React.PropTypes.func.isRequired,
      signupParams: React.PropTypes.object
    },

    mixins: [ React.BackboneMixin('user') ],

    getInitialState: function() {
      return {
        spinning: false
      };
    },

    componentWillMount: function() {
      var user = this.props.user;

      this.signupChain = new RestartableChain([
        user.save.bind(user),
        user.setAccessTokenCookie.bind(user),
        user.createDjangoSession.bind(user),
        user.sendCode.bind(user)
      ]);
    },

    /**
     * This slight hack allows a parent window to send connected FB info down, which allows the
     * homepage to pass a Facebook user to this view when it's in an iframe.
     */
    componentDidMount: function() {
      window.onmessage = function(e) {
        if ( e.data.name === 'OPEN_FACEBOOK' ) {
          var authResponse = e.data.fbResponse.authResponse;
          if ( authResponse ) {
            this.refs.fbConnect.handleUserAuthed(authResponse);
          }
        }
      }.bind(this);
    },

    /* handlers */

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        spinning: true,
        errorMessage: null,
        duplicateAccountError: false
      });

      mixpanel.track('SIGNUP_INFO_ADDED');

      return this.signupChain.execute()
        .then(this.props.handleSuccess)
        .catch(this.handleError);
    },

    handleError: function(err) {

      var errorMessage;
      var duplicateAccountError = false;
      if ( err.responseJSON && err.responseJSON.data ) {
        err = err.responseJSON.data.error;
      }

      /**
      * Errors specifically handled by signup component.
      *   1. Facebook connect duplicate.
      *   2. Duplicate email / phones.
      */
      if ( err.code === 223 ) {
        // facebook connect duplicate
        errorMessage = msg.signup.USER_FACEBOOK_ALREADY_TAKEN;
        duplicateAccountError = true;
      } else if ( err.errors && err.errors.length ) {
        /**
        * This means that there are one or more server side errors.
        */
        var error = err.errors[0];
        if ( error.error_type === 'USER_PHONE_ALREADY_TAKEN' ||
             error.error_type === 'USER_EMAIL_ALREADY_TAKEN' ) {

          if ( error.error_type === 'USER_PHONE_ALREADY_TAKEN' ) {
            errorMessage = msg.signup.USER_PHONE_ALREADY_TAKEN;
          } else {
            errorMessage = msg.signup.USER_EMAIL_ALREADY_TAKEN;
          }
          duplicateAccountError = true;
        }
      } else if ( err.message !== this.props.user.VALIDATION_ERROR ) {
        errorMessage = err.message || msg.signup.DEFAULT_ERROR;
      }

      this.setState({
        spinning: false,
        errorMessage: errorMessage,
        duplicateAccountError: duplicateAccountError
      });

      mixpanel.track('SIGNUP_INFO_ERROR', { error: err });
    },

    /* Facebook handlers */

    fbAuthed: function(auth) {
      this.props.user.set({
        'facebookId': auth.userID,
        'facebookAccessToken': auth.accessToken
      });
    },

    fbGotUser: function(response) {
      this.props.user.set({
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email
      });
    },

    fbLoggedOut: function() {
      this.props.user.set({
        'facebookId': undefined,
        'facebookAccessToken': undefined,
        'email': undefined,
        'firstName': undefined,
        'lastName': undefined
      });
    },

    /* rendering */

    shouldDisplayEmailSignupLabel: function() {
      return !this.props.user.get('facebookId');
    },

    renderSignupForm: function() {
      var duplicateAccountError = (
        /* jshint ignore:start */
        <span>
          <span>{this.state.errorMessage} </span>
          <span>Already have an account? </span>
          <span>Click <a href="/account/login">here</a> to login.</span>
        </span>
        /* jshint ignore:end */
      );
      var errorClass = "catch-all validation-error ";
      if ( !!this.state.errorMessage ||
           this.state.duplicateAccountError ) {
        errorClass += 'show-validation';
      }

      return (
        <form className="form-container" onSubmit={this.handleSubmit} ref="form">

          <HomepageUserAddView model={this.props.user} submitting={this.state.spinning} />

          <LaddaButton buttonClasses="submit button blue cta"
            data-style="slide-right"
            spinning={this.state.spinning}
            disabled={this.state.spinning}
            ref="ladda">
            Sign Up
          </LaddaButton>

          <div className={errorClass} ref="submitError">
            { this.state.duplicateAccountError ? duplicateAccountError : this.state.errorMessage }
          </div>

        </form>
      );
    },

    render: function() {

      var fbConnect = (
        <FacebookConnect onAuthed={this.fbAuthed}
          onGotUser={this.fbGotUser}
          onNoLogin={function() {}}
          onLoggedOut={this.fbLoggedOut}
          ref="fbConnect"
          openLoginImmediately={this.props.openFbLoginImmediately}
          noOutlineVersion
        />
      );

      return (
        <div className="signup embedded">
          {fbConnect}
          {this.renderSignupForm()}
        </div>
      );
    }
  });

  return SignupWidget;
});
