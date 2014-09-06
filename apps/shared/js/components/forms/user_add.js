/** @jsx React.DOM */
define([
  'react',
  'jsx!shared/js/components/forms/base_mixin',
  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/forms/inputs/email'
], function(React, BaseFormMixin, FormInput, EmailInput) {

  var UserAdd = React.createClass({
    mixins: [BaseFormMixin],

    renderForm: function() {
      return (
        <div>
          <fieldset className="inputs">
            <FormInput attr="firstName" placeholder="first name" type="text" wrapperClass="left" aria-label="first name"/>
            <FormInput attr="lastName" placeholder="last name" type="text" wrapperClass="right" aria-label="last name"/>
            <EmailInput attr="email" placeholder="email" type="text" aria-label="email" ref="email"/>
            <FormInput attr="phone" placeholder="phone" type="tel" aria-label="phone number"/>
            <FormInput attr="password" placeholder="password" type="password" wrapperClass="left" aria-label="password" />
          </fieldset>
        </div>
      );
    }
  });

  return UserAdd;
});
