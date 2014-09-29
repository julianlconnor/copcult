var path = require('path');
var expect = require('expect.js');
var Promise = require('bluebird');

var migrate = require(path.join(process.cwd(), 'test/helpers/migrate'));
var Storefront = require(path.join(process.cwd(), 'apps/api/models/storefront'));

describe('Storefront Model', function() {

  // before(function(done) {
  //   knex.migrate.rollback().then(function() {
  //     done();
  //   });
  // });
  //
  // beforeEach(function(done) {
  //   knex.migrate.latest().then(function() {
  //     done();
  //   });
  // });
  //
  // afterEach(function(done) {
  //   knex.migrate.rollback().then(function() {
  //     done();
  //   });
  // });

});
