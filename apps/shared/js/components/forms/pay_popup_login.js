/** @jsx React.DOM */

define([
  'q',
  'react',
  'shared/js/config/messages',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'react.backbone'
], function(q, React, msg, BaseFormMixin, FormInput) {

  var LoginForm = React.createBackboneClass({
    mixins: [BaseFormMixin],

    getInitialState: function() {
      return {
        didError: false,
        spinning: false
      };
    },

    componentDidMount: function() {
      // autofill hack
      // browsers, being Terrible Bad No-Good Things, generally don't trigger change events when
      // they autofill inputs. since chrome and firefox both autofill this login form, this hack
      // will properly set username/password on the user model

      var inputs = [this.refs.username, this.refs.password];

      inputs.forEach(function(input) {
        setTimeout(function() {
          if ( !this.isMounted() ) { return; }
          var val = input.refs.fieldInput.getDOMNode().value;
          var attr = input.props.attr;
          if ( val && val !== this.props.model.get(attr) ) {
            // this is guarded with a timeout so that when we set username, the browser doesn't
            // auto-clear the password
            setTimeout(function() {
              if ( !this.isMounted() ) { return; }
              this.props.model.set(attr, val);
            }.bind(this), 0);
          }
        }.bind(this), 200);  // magic number for chrome, which tends to have a delay on setting this
      }.bind(this));
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();  // prevent double-firing

      this.setState({ spinning: true });
      /**
      * This promise chain does the following:
      *
      *   1. Log the user in via both Django and the API.
      *   2. Continue regardless of the state of creating a Django session.
      *   3. Continue down the promise chain based on the state of creating a
      *   session via the API.
      *
      */
      return q.allSettled([
        this.props.model.login(),
        this.props.model.createDjangoSession()
      ]).spread(function(login) {
        if ( login.state === 'fulfilled' ) {
          return q.resolve(login.value);
        } else {
          return q.reject(login.reason);
        }
      }).then(this.props.onAuthed, this.authFailed)
        .then(this.stopSpinning);
    },

    stopSpinning: function() {
      this.setState({spinning: false});
    },

    authFailed: function(err) {
      var errorMessage;

      if ( err.status === 401 ) {
        errorMessage = msg.login.INVALID_USERNAME_OR_PASSWORD;
      } else if ( err.status === 400 ) {
        if ( err.responseJSON.error.code === 269 || err.responseJSON.error.code === 264) {
          errorMessage = msg.login.INVALID_USERNAME_OR_PASSWORD;
        } else {
          errorMessage = err.responseJSON.error.message;
        }
      } else {
        errorMessage = msg.login.DEFAULT_ERROR;
      }

      this.setState({
        didError: true,
        errorMessage: errorMessage
      });
    },

    renderForm: function() {
      var errorStyle = {display: 'none'};

      if ( this.state.didError ) {
        errorStyle.display = 'block';
      }

      var errorClass = "catch-all validation-error ";
      if ( !!this.state.errorMessage ) {
        errorClass += 'show-validation';
      }

      return (
        <form className="login-form pay-pop-up" onSubmit={this.handleSubmit}>
          <fieldset>
            <ul>
              <li>
                <FormInput
                  attr="username"
                  placeholder="you@email.com"
                  required
                  type="text"
                  label="Email Address"
                  ref="username"
                  autoCapitalize="off" />
              </li>
              <li>
                <FormInput
                  attr="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  ref="password"
                  label="Password"
                  name="password" />
              </li>
            </ul>
          </fieldset>

          <button className="ladda-button submit button blue cta" type="submit" ref="submitButton">Sign In</button>

          <div className={errorClass} style={errorStyle}>
            {this.state.errorMessage}
          </div>

        </form>
      );
    }
  });

  return LoginForm;
});
