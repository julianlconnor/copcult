define([
  'expect',
  'sinon',
  'react',
  'q',
  'shared/js/models/user',
  'jsx!shared/js/components/forms/change_number'
], function(expect, sinon, React, q, UserModel, ChangeNumber) {

  describe('Change number form', function() {

    var TU = React.addons.TestUtils;

    var root;
    var user;
    var changeNumber;

    beforeEach(function() {
      root = document.createElement('div');
      user = new UserModel();

      changeNumber = React.renderComponent(new ChangeNumber({
        model: user,
        onChangeNumber: function() {}
      }), root);

    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });

    it('Validates on submit', function(done) {
      var savePhoneStub = sinon.stub(user, 'savePhone', function() {
        return q('success').then(function() {
          savePhoneStub.restore();
          done();
        });
      });

      var preValidateSpy = sinon.spy(user, 'preValidate');

      changeNumber.refs.phone.getDOMNode().value = '555-555-5555';
      TU.Simulate.submit(changeNumber.refs.changeNumberForm.getDOMNode());

      expect(preValidateSpy.called).to.be(true);
    });

    it('Displays a phone validation error on submit', function() {
      changeNumber.refs.phone.getDOMNode().value = '1';
      TU.Simulate.submit(changeNumber.refs.changeNumberForm.getDOMNode());

      var validationError = changeNumber.refs.phoneError.getDOMNode();
      expect(validationError.classList.contains('show-validation')).to.be(true);
    });

    it('Calls savePhone for a valid phone', function(done) {
      var savePhoneStub = sinon.stub(user, 'savePhone', function() {
        return q('success').then(function() {
          savePhoneStub.restore();
          done();
        });
      });

      changeNumber.refs.phone.getDOMNode().value = '555-555-5555';
      TU.Simulate.submit(changeNumber.refs.changeNumberForm.getDOMNode());
    });

    it('Displays server-side validation errors', function(done) {

      TU.allUpdates(changeNumber, function() {
        if ( !!changeNumber.state.phoneError ) {
          var validationError = changeNumber.refs.phoneError.getDOMNode();
          expect(validationError.classList.contains('show-validation')).to.be(true);
          savePhoneStub.restore();
          done();
        }
      });

      var savePhoneStub = sinon.stub(user, 'savePhone', function() {
        return q.reject({
          responseJSON: {
            data: {
              error: {
                code: 1107,
                message: 'shit got broke'
              }
            }
          }
        });
      });

      changeNumber.refs.phone.getDOMNode().value = '555-555-5555';
      TU.Simulate.submit(changeNumber.refs.changeNumberForm.getDOMNode());

    });

  });

});
