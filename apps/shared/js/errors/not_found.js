/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var NotFoundView = React.createClass({

    getInitialState: function() {
      var route = window.location.pathname;
      var messageBefore;
      var messageAfter = null;
      var link;
      var linkText;

      var isSettingsRoute = function(route) {
        return /^\/w\/settings\/*/.test(route);
      };
      var isLoginRoute = function(route) {
        return /^\/w\/login\/*/.test(route);
      };
      var isSignupRoute = function(route) {
        return /^\/w\/signup\/*/.test(route);
      };
      var isUsersRoute = function(route) {
        return /^\/w\/users\/*/.test(route);
      };
      var isNotificationsRoute = function(route) {
        return /^\/w\/notifications\/*/.test(route);
      };

      if ( isSettingsRoute(route) ) {
          messageBefore = 'Are you looking to change your settings? If so, ';
          link = '/w/settings';
          linkText = 'head over here.';
      } else if ( isLoginRoute(route) ) {
          messageBefore = 'Where you trying to go? Login is ';
          link = '/w/login';
          linkText = 'this way.';
      } else if ( isSignupRoute(route) ) {
          messageBefore = 'If you\'re looking to sign up, ';
          link = '/w/signup';
          linkText = 'head over here.';
          messageAfter = '';
      } else if ( isUsersRoute(route) ) {
          messageBefore = 'Looking for a user? ';
          link = '/w/users';
          linkText = 'Head this way';
          messageAfter = ' to find your friends.';
      } else if ( isNotificationsRoute(route) ) {
          messageBefore = 'This probably wasn\'t the story you were looking for. Why not ';
          link = '/w/notifications';
          linkText = 'head over here?';
      } else {
          messageBefore = 'No worries, let\'s just ';
          link = '/w/';
          linkText = 'head back home.';
      }

      return {
        messageBefore: messageBefore,
        messageAfter: messageAfter,
        link: link,
        linkText: linkText
      }
    },

    render: function() {
      return (
        <div className='error-page'>
          <div className='claim-index'>
            <img className='venmo' src='/w/shared/images/venmo_blue.png'/>
            <div className='container'>
              <h2>404 Looks like we've left <a href='/w/'>Venmo land.</a></h2>
              <p>
                {this.state.messageBefore}
                <a href={this.state.link}>{this.state.linkText}</a>
                {this.state.messageAfter}
              </p>
              <p className='error-description'>
                Please contact <a href='mailto:support@email.com'>support@venmo.com</a> if you need further help.
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return NotFoundView;
});
