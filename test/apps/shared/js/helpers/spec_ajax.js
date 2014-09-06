define([
  'expect',
  'sinon',
  'q',
  'jquery',
  'underscore',
  'shared/js/helpers/ajax',
  'jquery.cookie'
], function(expect, sinon, q, $, _, ajax) {

  describe('ajax helper', function() {

    var $ajax;
    var defaults = {
      type: 'GET'
    };

    beforeEach(function() {
      $ajax = sinon.stub($, 'ajax');
    });

    afterEach(function() {
      $ajax.restore();
    });

    it('calls $.ajax', function() {
      return ajax(defaults).then(function() {
        expect($ajax.called).to.be(true);
      });
    });

    it('does not add XSRF when HTPT method is GET', function() {
      $.cookie('_xsrf', 'foo');
      var data = _.extend(defaults, {
        data: { foo: true }
      });

      return ajax(data).then(function() {
        var data = $ajax.args[0][0].data;
        expect(data['_xsrf']).to.not.be.ok();
      });
    });

    it('adds XSRF when HTTP method is POST', function() {
      $.cookie('_xsrf', 'foo');

      return ajax({ type: 'PUT' }).then(function() {
        var data = $ajax.args[0][0].data;
        expect(data['_xsrf']).to.be('foo');
      });
    });

    it('adds XSRF when HTTP method is PUT', function() {
      $.cookie('_xsrf', 'foo');

      return ajax({ type: 'PUT' }).then(function() {
        var data = $ajax.args[0][0].data;
        expect(data['_xsrf']).to.be('foo');
      });
    });

    it('sets xhr to use credentials when withCredentials is passed', function() {
      var data = _.extend(defaults, { withCredentials: true });

      return ajax(data).then(function() {
        expect($.ajax.args[0][0].xhrFields.withCredentials).to.be(true);
      });
    });

  });
});
