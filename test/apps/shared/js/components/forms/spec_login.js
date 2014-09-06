define([
  'q',
  'expect',
  'sinon',
  'react',
  'shared/js/models/user',
  'jsx!shared/js/components/forms/login'
], function(q, expect, sinon, React, UserModel, LoginForm) {

  var TU = React.addons.TestUtils;

  describe('Login form', function() {
    var root;
    var user;
    var loginForm;

    beforeEach(function() {
      root = document.createElement('div');
      user = new UserModel();
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('instantiates', function() {
      loginForm = React.renderComponent(new LoginForm({
        model: user,
        onAuthed: function() {}
      }), root);

      expect(loginForm).to.be.ok();
    });

    it('enables the submit button on a valid email and existence of pw', function() {
      loginForm = React.renderComponent(new LoginForm({
        model: user,
        onAuthed: function() {}
      }), root);

      user.set('username', 'julian@venmo.com');
      user.set('password', 'foobarbas');

      TU.nextUpdate(loginForm, function() {
        var submitButton = loginForm.refs.submitButton.refs.button.getDOMNode();
        expect(submitButton.disabled).to.be(false);
      });
    });

    describe('Logging In', function() {

      it('calls both model login and create django session on form submission', function(done) {
        var loginStub = sinon.stub(user, 'login').returns(q('success'));
        var djangoStub = sinon.stub(user, 'createDjangoSession').returns(q('success'));

        loginForm = React.renderComponent(new LoginForm({
          model: user,
          onAuthed: function() { }
        }), root);

        loginForm.handleSubmit({
          preventDefault: sinon.spy(),
          stopPropagation: sinon.spy()
        }).then(function(){
          expect(loginStub.called).to.be(true);
          expect(djangoStub.called).to.be(true);
          loginStub.restore();
          djangoStub.restore();
          done();
        });

      });

      it('calls onAuthed even if it fails to login to django', function(done) {
        var loginStub = sinon.stub(user, 'login').returns(q('success'));
        var djangoStub = sinon.stub(user, 'createDjangoSession').returns(q.reject());

        loginForm = React.renderComponent(new LoginForm({
          model: user,
          onAuthed: sinon.spy()
        }), root);

        var authFailedStub = sinon.stub(loginForm, 'authFailed');

        loginForm.handleSubmit({
          preventDefault: sinon.spy(),
          stopPropagation: sinon.spy()
        }).done(function() {
          expect(loginForm.props.onAuthed.called).to.be(true);

          loginStub.restore();
          djangoStub.restore();
          authFailedStub.restore();

          done();
        });

      });

    });

  });

});
