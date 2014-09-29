var path = require('path');
var expect = require('expect.js');
var Promise = require('bluebird');

var migrate = require(path.join(process.cwd(), 'test/helpers/migrate'));
var User = require(path.join(process.cwd(), 'apps/api/models/user'));

describe('User Model', function() {

  before(function(done) {
    migrate.rollback(done);
  });

  beforeEach(function(done) {
    migrate.latest(done);
  });

  afterEach(function(done) {
    migrate.rollback(done);
  });

  it('can be instantiated', function() {
    expect(new User()).to.be.ok();
  });

  it('can fetch', function(done) {
    Promise.all([
      new User().save(),
      new User().save()
    ]).then(function() {
      new User().fetchAll().then(function(col) {
        expect(col.toJSON().length).to.be(2);
        done();
      });
    });
  });

});
