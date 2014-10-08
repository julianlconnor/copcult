var path = require('path');
var expect = require('expect.js');
var Promise = require('bluebird');

var Item = require(path.join(process.cwd(), 'apps/api/models/item'));
var Storefront = require(path.join(process.cwd(), 'apps/api/models/storefront'));
var ItemStorefront = require(path.join(process.cwd(), 'apps/api/models/item_storefront'));
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

describe('DELETE /storefronts/items/:itemId', function() {

  before(function(done) {
    migrate.rollback(done);
  });

  beforeEach(function(done) {
    migrate.latest(done);
  });

  afterEach(function(done) {
    migrate.rollback(done);
  });

  it.only('removes the item association', function(done) {
    /**
    * Create the Storefront and item.
    */
    return Promise.all([
      new Storefront({
        userId: 1
      }).save(),
      new Item({
        name: 'foo',
        url: 'http://foo.bar'
      }).save()
    ]).spread(function(storefront, item) {
      return new ItemStorefront({
        itemId: item.id,
        storefrontId: storefront.id
      }).save().then(function(itemstorefront) {
        var req = {
          param: function(param) {
            if ( param === 'storefrontId' ) {
              return storefront.id;
            } else {
              return item.id;
            }
          }
        };
        var res = { 
          json: function() {
            /**
            * ItemStorefront should no longer exist.
            */
            new ItemStorefront({
              id: itemstorefront.id
            }).fetch({ require: true }).then(null, function() {
              done();
            });
          }
        };

        return StorefrontsHandler.deleteItem(req, res);
      });
    });

  });

});

