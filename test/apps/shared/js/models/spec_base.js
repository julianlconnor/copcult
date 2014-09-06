define([
  'jquery',
  'expect',
  'sinon',
  'q',
  'claims/public/js/modals/base'
], function($, expect, sinon, q, BaseModalView) {

  var content = 'Content';

  var TestModal = BaseModalView.extend({

    postInitialize: function() {
      this.content = content;
    }

  });

  describe('Venmo Modal', function() {
    var modal;

    beforeEach(function() {
      modal = new TestModal();
      modal.show();
    });

    it('instantiates', function() {
      expect(modal).to.be.ok();
    });

    it('populates its content', function() {
      expect(modal.$('.modal-content').html()).to.be(content);
    });

    it('removes self on close', function() {
      var mock = sinon.mock(modal);
      mock.expects('remove').once();

      modal.$('.modal-close').click();
      mock.verify();
    });

    it('removes self on click of overlay', function() {
      var mock = sinon.mock(modal);
      mock.expects('remove').once();

      modal.$('.modal-overlay').click();
      mock.verify();
    });

  });

});
