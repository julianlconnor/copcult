/** @jsx React.DOM */
define([
  'react',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/forms/inputs/email'
], function(React, BaseFormMixin, FormInput, EmailInput) {

  var SignupUserAdd = React.createClass({
    mixins: [BaseFormMixin],

    renderForm: function() {
      return (
        <fieldset className="inputs">
          <div className="first-part">
            <FormInput attr="firstName" label="First name" type="text" aria-label="first name" hideError />
            <FormInput attr="lastName" label="Last name" type="text" aria-label="last name" hideError />
            <EmailInput attr="email" label="Email" type="email" aria-label="email" autoCapitalize="off" />
          </div>

          <FormInput attr="phone" label="Phone" type="tel" aria-label="phone number" hideError />
          <FormInput attr="password" label="Password" type="password" aria-label="password" />
        </fieldset>
      );
    }
  });

  return SignupUserAdd;
});
