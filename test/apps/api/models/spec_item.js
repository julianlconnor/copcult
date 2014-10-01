var path = require('path');
var sinon = require('sinon');
var expect = require('expect.js');

var migrate = require(path.join(process.cwd(), 'test/helpers/migrate'));
var Item = require(path.join(process.cwd(), 'apps/api/models/item'));

describe('Item Model', function() {

  before(function(done) {
    migrate.rollback(done);
  });

  beforeEach(function(done) {
    migrate.latest(done);
  });

  afterEach(function(done) {
    migrate.rollback(done);
  });

  it('will not save if url is not a url', function(done) {
    var spy = sinon.spy();
    return new Item({
      url: 'foo'
    }).save().then(spy, function(validationError) {
      expect(spy.called).to.be(false);
      expect(validationError.errors.url).to.be.ok();
      done();
    });
  });

  it('will save if url is not a url', function(done) {
    var spy = sinon.spy();
    return new Item({
      url: 'https://venmo.com'
    }).save().then(function() {
      expect(spy.called).to.be(false);
      done();
    }, spy);
  });

});
