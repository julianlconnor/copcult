define([
  'expect',
  'sinon',
  'q',
  'react',
  'jsx!shared/js/components/forms/user_add',
  'shared/js/models/user',
  'base/test/fixtures/mailgun.js'
], function(expect, sinon, q, React, UserAddForm, UserModel, mailgunFixtures) {

  var TU = React.addons.TestUtils;

  describe('User add form', function() {
    var root;
    var model;
    var userForm;

    beforeEach(function() {
      root = document.createElement('div');
      model = new UserModel();
      userForm = React.renderComponent(new UserAddForm({
        model: model
      }), root);
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('instantiates', function() {
      expect(userForm).to.be.ok();
    });

    it('renders 5 inputs', function() {
      expect($('input', root).length).to.be(5);
    });

    describe('email input', function() {

      var validateWithStub = function(data, cb) {
        var stub = sinon.stub(model, 'verifyEmailViaMailgun', function() {
          return q(data);
        });

        var input = userForm.refs.email.refs.fieldInput.getDOMNode();
        TU.Simulate.blur(input);

        TU.nextUpdate(userForm.refs.email, function() {
          stub.restore();
          cb();
        });
      };

      it('runs mailgun validation on blur', function() {
        var stub = sinon.stub(model, 'verifyEmailViaMailgun', function() {
          return q({
            is_valid: true
          });
        });

        model.set('email', 'asdf@asdf.com');
        var input = userForm.refs.email.refs.fieldInput.getDOMNode();
        TU.Simulate.blur(input);

        expect(stub.called).to.be(true);
        stub.restore();
      });

      it('displays validation error on failure', function(done) {

        validateWithStub(mailgunFixtures.error, function() {
          var errorMsg = userForm.refs.email.refs.validationError.getDOMNode().innerText;
          expect(errorMsg).to.be('Please check your email address');
          done();
        });

      });

      it('removes validation error on fix', function(done) {
        validateWithStub(mailgunFixtures.error, function() {

          // defer prevents previously-called nextUpdate from getting called again
          // (nextUpdate should really take care of this itself :I)
          _.defer(function() {
            validateWithStub(mailgunFixtures.success, function() {
              var errorMsg = userForm.refs.email.refs.validationError.getDOMNode().innerText;
              expect(errorMsg).to.be('');
              done();
            });
          });
        });
      });

      it('displays suggested email', function(done) {

        validateWithStub(mailgunFixtures.didYouMean, function() {
          var errorMsg = userForm.refs.email.refs.validationError.getDOMNode().innerText;
          expect(errorMsg).to.be('Did you mean ' + mailgunFixtures.didYouMean.did_you_mean + '?');
          done();
        });

      });

    });

  });

});
