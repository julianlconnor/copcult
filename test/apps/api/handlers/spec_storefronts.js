var path = require('path');
var expect = require('expect.js');
var Promise = require('bluebird');

var Storefront = require(path.join(process.cwd(), 'apps/api/models/storefront'));
var StorefrontsHandler = require(path.join(process.cwd(), 'apps/api/handlers/storefronts'));

var migrate = require(path.join(process.cwd(), 'test/helpers/migrate'));

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

describe('GET /storefronts?user_id=1', function() {

  before(function(done) {
    migrate.rollback(done);
  });

  beforeEach(function(done) {
    migrate.latest(done);
  });

  afterEach(function(done) {
    migrate.rollback(done);
  });

  it('properly fetches a user\'s storefronts', function(done) {
    var req = {
      param: function() {
        return 1;
      }
    };
    var res = {
      json: function(payload) {
        var data = payload.data;
        expect(data.length).to.be(1);
        done();
      }
    };

    return Promise.all([
      new Storefront({
        userId: 1
      }).save(),
      new Storefront({
        userId: 2
      }).save()
    ]).then(function() {
      return StorefrontsHandler.getAll(req, res);
    });
  });

});

