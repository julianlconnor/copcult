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
        spinning: false
      };
    },

    handleSubmit: function(e) {
      e.preventDefault();
      e.stopPropagation();  // prevent double-firing

      this.setState({spinning: true});
      this.props.model.forgotPassword()
        .finally(this.stopSpinning)
        .done(this.didReset, this.didError);
    },

    stopSpinning: function() {
      this.setState({spinning: false});
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

          <fieldset className="inputs">
            <FormInput attr="email"
              placeholder="Email"
              required type="text" />
          </fieldset>

          { this.state.errorMessage ? <p>{this.state.errorMessage}</p> : undefined }

          <LaddaButton buttonClasses="submit button blue cta"
            data-style="slide-right"
            disabled={!this.props.model.isValid(['email'])}
            spinning= {this.state.spinning} >
            Reset
          </LaddaButton>

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
