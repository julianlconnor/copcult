/** @jsx React.DOM */
define([
  'react',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/forms/inputs/email'
], function(React, BaseFormMixin, FormInput, EmailInput) {

  var HomepageUserAdd = React.createClass({
    mixins: [BaseFormMixin],

    renderForm: function() {
      return (
        <fieldset className="inputs">
          <div className="first-part">
            <span className="names">
              <FormInput attr="firstName" placeholder="First name"
                type="text" aria-label="first name" hideError />
              <FormInput attr="lastName" placeholder="Last name"
                type="text" aria-label="last name" hideError />
            </span>
            <EmailInput attr="email" placeholder="Email address" 
              type="email" aria-label="email" autoCapitalize="off" hideError />
          </div>
          <FormInput attr="phone" placeholder="Phone" 
            type="tel" aria-label="phone number" hideError />
          <FormInput attr="password" placeholder="Create password"
            type="password" aria-placeholder="password" hideError />
        </fieldset>
      );
    }
  });

  return HomepageUserAdd;
});
