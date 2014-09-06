/** @jsx React.DOM */

define([
  'react',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input'
], function(React, BaseFormMixin, FormInput) {

  var BankAdd = React.createClass({
    mixins: [BaseFormMixin],

    renderForm: function() {
      return (
        <fieldset className="inputs">
          <FormInput type="text" inputClass="routing-number first-field"
            pattern="\d*" x-autocompletetype="routing-number"
            aria-label="routing number"
            placeholder="routing number" required attr="routingNumber" />

          <FormInput type="text" inputClass="account-number" pattern="\d*"
            x-autocompletetype="account-number" placeholder="account number"
            aria-label="account number"
            required attr="accountNumber" />

          <FormInput type="text" inputClass="account-number-confirm"
            pattern="\d*" x-autocompletetype="account-number"
            placeholder="confirm account number" required
            aria-label="confirm account number"
            attr="accountNumberConfirm" />
        </fieldset>
      );
    }
  });

  return BankAdd;

});
