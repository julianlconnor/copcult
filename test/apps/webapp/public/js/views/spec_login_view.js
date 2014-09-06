define([
  'jquery',
  'expect',
  'sinon',
  'q',
  'react',
  'shared/js/models/user',
  'jsx!shabu/public/js/views/login_view'
], function($, expect, sinon, q, React, UserModel, LoginComponent) {

  describe('Login component', function() {
    var root, loginComponent, userModel;

    beforeEach(function() {
      root = document.createElement('div');
      userModel = new UserModel();

      loginComponent = React.renderComponent(new LoginComponent({
        user: userModel
      }), root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('Toggles between "login" and "forgot password" views', function() {
      // default to login
      expect(loginComponent.refs.login).to.be.ok();

      // toggling should show forgot password
      loginComponent.toggle();
      expect(loginComponent.refs.login).to.not.be.ok();
      expect(loginComponent.refs.forgotpassword).to.be.ok();

      // toggle back to show login
      loginComponent.toggle();
      expect(loginComponent.refs.login).to.be.ok();
      expect(loginComponent.refs.forgotpassword).to.not.be.ok();
    });

  });

});
