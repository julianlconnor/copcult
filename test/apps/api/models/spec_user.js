var path = require('path');
var expect = require('expect.js');

var knex = require(path.join(process.cwd(), 'config/bookshelf'))().knex;
var User = require(path.join(process.cwd(), 'apps/api/models/user'));

describe('User Model', function() {

  before(function(done) {
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    knex.migrate.latest().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  it('can be instantiated', function() {
    expect(new User()).to.be.ok();
  });

  it('can fetch', function(done) {
    new User().fetchAll().then(function() {
      done();
    });
  });

});
