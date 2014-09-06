/** @jsx React.DOM */

define([
  'react',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/ladda',
  'react.backbone'
], function(React, BaseFormMixin, FormInput, LaddaButton) {

  var ForgotPasswordForm = React.createBackboneClass({
    mixins: [BaseFormMixin],

    getInitialState: function() {
      return {
        didReset: false,
        submitting: false
      };
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();  // prevent double-firing

      this.setState({ submitting: true });
      this.props.model.forgotPassword()
        .finally(this.doneSubmitting)
        .done(this.didReset, this.didError);
    },

    doneSubmitting: function() {
      this.setState({ submitting: false });
    },

    didReset: function() {
      this.setState({
        didReset: true
      });
    },

    didError: function() {
      this.setState({
        errorMessage: 'An unknown error occurred.'
      });
    },

    renderForm: function() {
      var form = (
        <form onSubmit={this.handleSubmit}>
          <p>Enter your email address to receive instructions on resetting your password:</p>
          <fieldset>
            <ul>
              <li>
                <FormInput attr="email"
                  placeholder="you@email.com"
                  required
                  type="text"
                  label="Email Address"
                  autoCapitalize="off" />
              </li>
            </ul>
          </fieldset>

          { this.state.errorMessage ? <p>{this.state.errorMessage}</p> : undefined }

          <footer>
            <LaddaButton buttonClasses="submit button gray cta"
              data-style="slide-right"
              spinning={this.state.submitting} >
              Reset
            </LaddaButton>
          </footer>

        </form>
      );

      var didReset = (
        <p>
          Check your email for instructions on how to reset your password.
        </p>
      );

      if ( this.state.didReset ) {
        return didReset;
      } else {
        return form;
      }
    }
  });

  return ForgotPasswordForm;
});
