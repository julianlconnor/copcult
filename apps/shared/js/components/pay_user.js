/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/forms/inputs/user',
  'jsx!shared/js/components/ladda',
  'jsx!shared/js/components/forms/inputs/audience_select',
  'react.backbone'
], function(React, _, BaseFormMixin, FormInput, UserInput, LaddaButton, AudienceSelect) {

  var cx = React.addons.classSet;

  var PaymentForm = React.createClass({
    propTypes: {
      model: React.PropTypes.object.isRequired
    },

    mixins: [
      BaseFormMixin,
      React.BackboneMixin('model')
    ],

    getInitialState: function() {
      return {
        spinning: false
      };
    },

    handleSubmit: function(e) {
      e.preventDefault();
      this.setState({spinning: true, errorMessage: null});
      this.props.onSubmit(e)
        .finally(this.handleDone)
        .catch(this.handleError);
    },

    handleError: function(err) {
      var errorMessage;

      if ( err.message === this.props.model.VALIDATION_ERROR ) {
        var errors = this.props.model.validate();
        errorMessage = _.values(errors)[0];  // fuckit.js
      } else if ( err.responseJSON ) {
        errorMessage = err.responseJSON.error.message;
      } else {
        errorMessage = 'An unknown error occurred.';
      }

      this.setState({
        errorMessage: errorMessage
      });
    },

    handleDone: function() {
      if ( this.isMounted() ) {
        this.setState({spinning: false});
      }
    },

    renderError: function() {

      var errorClass = cx({
        'catch-all': true,
        'validation-error': true,
        'show-validation': this.state.errorMessage
      });

      return (
        <div className={errorClass} ref="submitError">
          { this.state.errorMessage }
        </div>
      );
    },

    renderForm: function() {
      var transaction = this.props.model;
      var recipient = this.props.model.get('recipients')[0];

      return (
        <div>
          <h2>Pay User</h2>

          <AudienceSelect transaction={transaction} />

          <form className="form-container" onSubmit={this.handleSubmit}>
            <fieldset className="widget-form inputs">
              <div className="form-row">
                <UserInput model={recipient} disabled label="Recipient" wrapperClass="left user" />
                <FormInput ref="amount" attr="amount" placeholder="e.g., 1.00" required type="text" label="Amount" wrapperClass="right amount"/>
              </div>
              <div className="clear" />
              <FormInput ref="note" attr="note" placeholder="e.g., for using venmo" required type="text" label="Note" wrapperClass="last" />
            </fieldset>

            {this.renderError()}

            <LaddaButton buttonClasses="submit button blue cta"
              data-style="slide-right"
              disabled={ !(transaction.get('amount') && transaction.get('note')) }
              spinning= {this.state.spinning} >
              Pay
            </LaddaButton>

          </form>
        </div>
      );
    }
  });

  return PaymentForm;
});
