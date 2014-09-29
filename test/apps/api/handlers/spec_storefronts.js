var path = require('path');
var expect = require('expect.js');

var StorefrontsHandler = require(path.join(process.cwd(), 'apps/api/handlers/storefronts'));

describe('GET /storefronts/:storefrontId', function() {

  it('500s if no storefront id is provided', function(done) {
    var req = {
      param: function() {
        return null;
      }
    };
    var res = {
      send: function(code) {
        expect(code).to.be(500);
        done();
      }
    };

    StorefrontsHandler.getOne(req, res);
  });

});

