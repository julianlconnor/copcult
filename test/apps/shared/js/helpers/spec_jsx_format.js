define([
  'expect',
  'jsx!shared/js/helpers/jsx_format'
], function(expect, jsxFormat) {

  describe('emoji parsing', function() {

    describe('when emojis are not supported', function() {

      it('transforms emoji code points to img tags', function() {
        var originalText = 'check this emoji 🌀';
        var transformedParts = jsxFormat.emojiTransform(originalText);

        expect(transformedParts.length).to.be(2);
        expect(transformedParts[0]).to.be('check this emoji ');
        expect(transformedParts[1].props.src).to.be('/w/shared/images/emoji/1f300.png');
      });

    });

  });

  describe('url parsing', function() {

    it('transforms links starting with http:// into html link tags', function() {
      var originalText = 'Check out http://www.google.com';
      var transformedParts = jsxFormat.urlTransform(originalText);

      expect(transformedParts.length).to.be(5);
      expect(transformedParts[0]).to.be('Check');
      expect(transformedParts[1]).to.be(' ');
      expect(transformedParts[2]).to.be('out');
      expect(transformedParts[3]).to.be(' ');
      expect(transformedParts[4].props.href).to.be('http://www.google.com');
    });

    it('transforms links starting with www into html link tags', function() {
      var originalText = 'Check out www.google.com';
      var transformedParts = jsxFormat.urlTransform(originalText);

      expect(transformedParts.length).to.be(5);
      expect(transformedParts[0]).to.be('Check');
      expect(transformedParts[1]).to.be(' ');
      expect(transformedParts[2]).to.be('out');
      expect(transformedParts[3]).to.be(' ');
      expect(transformedParts[4].props.href).to.be('http://www.google.com');
    });

    it('transforms multiple links next to each other', function() {
      var originalText = 'www.a.com www.b.com www.c.com';
      var transformedParts = jsxFormat.urlTransform(originalText);

      expect(transformedParts.length).to.be(5);
      expect(transformedParts[0].props.href).to.be('http://www.a.com');
      expect(transformedParts[1]).to.be(' ');
      expect(transformedParts[2].props.href).to.be('http://www.b.com');
      expect(transformedParts[3]).to.be(' ');
      expect(transformedParts[4].props.href).to.be('http://www.c.com');

    });

  });

});
