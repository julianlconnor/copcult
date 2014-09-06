define([
  'shared/js/helpers/validations'
], function(validations) {

  describe('Validations helper', function() {
    describe('isValidPhone', function() {
      it('should return true for valid phones', function() {
        var generateValidPhones = function(cb) {
          var numbers = [['1', '555', '555', '5555'], ['1', '(555)', '555', '5555']];
          var delimeters = ['', ',', ' ', '.', '-', '_', '/', '\\', '  ', '*'];
          var slices = [0, 1];
          slices.forEach(function(n) {
            delimeters.forEach(function(delimeter) {
              numbers.forEach(function(number) {
                var phone = number.slice(n).join(delimeter);
                cb(phone);
              });
            });
          });
        };

        generateValidPhones(function(phone) {
          expect(validations.isValidPhone(phone)).to.be(true);
        });
      });

      it('should return false for invalid phones', function() {
        var invalidPhones = [
          'trololo',
          1234567890,
          '555-5555',
          '555-555-555-5555',
          '',
          '    ',
          '0000000'
        ];

        invalidPhones.forEach(function(phone) {
          expect(validations.isValidPhone(phone)).to.be(false);
        });
      });
    });
  });


});
