define([
  'expect',
  'shared/js/helpers/format'
], function(expect, format) {

  describe('phone formatting', function() {
    it('properly formats numbers', function() {
      expect(format.phoneNumber('15554445555')).to.be('(555) 444-5555');
      expect(format.phoneNumber('5554445555')).to.be('(555) 444-5555');

      expect(format.phoneNumber('123')).to.be('123');
    });
  });

  describe('money formatting', function() {
    it('formats money', function() {
      expect(format.moneyAmount(7)).to.be('7.00');
      expect(format.moneyAmount(7.8)).to.be('7.80');
      expect(format.moneyAmount(7.801)).to.be('7.80');

      expect(format.moneyAmount(3000)).to.be('3,000.00');
      expect(format.moneyAmount(3000.8)).to.be('3,000.80');
      expect(format.moneyAmount(3000.801)).to.be('3,000.80');
    });
  });

  describe('list formatting', function() {
    it('leaves a one-element list alone', function() {
      expect(format.list(['foo'])).to.be('foo');
    });

    it('doesn\'t use a comma in a two-element list', function() {
      expect(format.list(['foo', 'bar'])).to.be('foo and bar');
    });

    it('creates a comma-separated list for 3+ items', function() {
      expect(format.list(['foo', 'bar', 'baz'])).to.be('foo, bar, and baz');
    });
  });

});
