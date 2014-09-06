define([
  'expect',
  'sinon',
  'react',
  'underscore',
  'jsx!shared/js/components/timestamp',
], function(expect, sinon, React, _, Timestamp) {

  describe('timestamp component', function() {
    var stub;
    var date = new Date();
    var TU = React.addons.TestUtils;

    afterEach(function() {
      stub.restore();
    });

    it('should update at a given interval', function(done) {
      stub = sinon.stub(window, 'setInterval', function(fn, interval) {
        expect(interval).to.be(10);
        done();
      });
      TU.renderIntoDocument(new Timestamp({
        date: date,
        updateInterval: 10
      }));
    });

  });

});
