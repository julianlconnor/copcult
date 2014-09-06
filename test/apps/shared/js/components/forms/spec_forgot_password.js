define([
  'expect',
  'sinon',
  'react',
  'shared/js/models/user',
  'jsx!shared/js/components/forms/forgot_password'
], function(expect, sinon, React, UserModel, ForgotPasswordForm) {

  var TU = React.addons.TestUtils;

  describe('Forgot PW form', function() {
    var root;
    var user;
    var forgotPasswordForm;

    beforeEach(function() {
      root = document.createElement('div');
      user = new UserModel();
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('instantiates', function() {
      forgotPasswordForm = React.renderComponent(new ForgotPasswordForm({
        model: user,
        onReset: function() {}
      }), root);

      expect(forgotPasswordForm).to.be.ok();
    });

    it('enables the submit button on a valid email', function() {
      forgotPasswordForm = React.renderComponent(new ForgotPasswordForm({
        model: user,
        onReset: function() {}
      }), root);

      user.set('email', 'julian@venmo.com');

      TU.nextUpdate(forgotPasswordForm, function() {
        var submitButton = forgotPasswordForm.refs.submitButton.refs.button.getDOMNode();
        expect(submitButton.disabled).to.be(false);
      });
    });

  });

});
