define([
  'expect',
  'sinon',
  'q',
  'shabu/public/js/app_router',
  'shared/js/helpers/route'
], function(expect, sinon, q, AppRouter, Route) {

  var router = new AppRouter();

  describe('route object', function() {
    it('identifies a subclass correctly', function() {
      var TestRoute = Route.extend();
      expect(Route.isRouteConstructor(TestRoute)).to.be(true);

      var testRoute = new TestRoute();
      expect(testRoute instanceof Route).to.be(true);
    });
  });

  describe('router execute hook', function() {

    it('creates a route and calls its hooks when given a constructor', function(done) {
      var initWasCalled = false;
      var TestRoute = Route.extend({
        initialize: function() {
          initWasCalled = true;
        },
        render: function() {
          expect(initWasCalled).to.be(true);
          done();
        }
      });

      router.execute(TestRoute);
    });

    it('just calls a standard callback', function(done) {
      var cb = function() {
        done();
      };

      router.execute(cb);
    });

  });

  describe('error handling', function() {

    it('will call render404 when the initialize hook rejects with a 404 status', function(done) {
      var render404Stub = sinon.stub(router, 'render404', function() {
        render404Stub.restore();
        done();
      });

      var NowhereRoute = Route.extend({
        initialize: function() {
          var dfd = q.defer();
          dfd.reject({ status: 404 });
          return dfd.promise;
        },
        render: function() {}
      });

      router.execute(NowhereRoute);
    });

    it('will call render500 when the initialize hook rejects with a 500', function(done) {
      var render500Stub = sinon.stub(router, 'render500', function() {
        render500Stub.restore();
        done();
      });

      var NowhereRoute = Route.extend({
        initialize: function() {
          return q.reject({ status: 500 });
        },
        render: function() {}
      });

      router.execute(NowhereRoute);
    });
  });
});
