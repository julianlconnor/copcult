defineTest([
  'sinon',
  'expect',
  'q',
  'shared/js/helpers/mixpanel',
], {
  mocks: { 
    'mixpanel.events': 'fixtures/events',
    'mixpanel.experiments': 'fixtures/experiments',
  }
}, function(sinon, expect, q, mixpanel) {


  describe('Mixpanel Helper', function() {
    var console_spy;
    var trackStub;

    beforeEach(function(){
      window.localStorage.clear();
      console_spy = sinon.stub(console, 'error');
      trackStub = sinon.stub(window.mixpanel, 'track').returns(q('success'));

    });

    afterEach(function(){
      console_spy.restore();
      trackStub.restore();
    });

    describe('track', function() {
      it('successfully retrieves defined event from events config', function(done) {
        var evt = 'TEST_EVENT';
        mixpanel.events[evt] = 'Test event';
        mixpanel.track(evt).then(function() {
          expect(window.mixpanel.track.calledWith(mixpanel.events[evt])).to.be(true);
          done();
        });
      });

      it('calls track with passed in string if event is not defined', function(done) {

        var evt = 'Undefined Event';
        mixpanel.track(evt).then(function() {
          expect(window.mixpanel.track.calledWith(evt)).to.be(true);
          done();
        });
      });

      describe('promise', function() {
        var evt = 'TEST_EVENT';
        mixpanel.events[evt] = 'Test event';

        // we're stubbing out our track function on every mixpanel test,
        // but in these tests we actually have to specify the return values.
        // kind of ugly, but I'm not sure a better way to organize this.
        beforeEach(function() {
          trackStub.restore();
        });

        afterEach(function() {
          trackStub.restore();
        });

        it('returns a promise that resolves on success', function(done) {
          trackStub = sinon.stub(window.mixpanel, 'track', function(page, params, callback) {
            var dfd = q.defer();
            if (callback) { callback(arguments); }
            dfd.resolve('success');
            return dfd.promise;
          });

          var promise = mixpanel.track(evt)
          promise.finally(function() {
            expect(promise.isFulfilled()).to.be(true);
            done();
          });
        });

        it('returns a rejected promise on mixpanel track failure', function(done) {
          trackStub = sinon.stub(window.mixpanel, 'track', function() {
            throw new Error('stop. hammer time.');
          });

          var promise = mixpanel.track(evt);
          promise.finally(function() {
            expect(promise.isRejected()).to.be(true);
            done();
          });
        });

        it('returns a rejected promise on mixpanel timeout', function(done) {
          mixpanel.trackingTimeout = 1;

          var promise = mixpanel.track(evt);
          promise.finally(function() {
            expect(promise.isRejected()).to.be(true);
            done();
          });
        });
      });

    });



    describe('willTrack', function() {

      it('returns a function if passed two arguments', function() {
        var foo = mixpanel.willTrack('foo', function() { });

        expect(foo).to.be.a('function');
      });

      it('invokes the passed function', function(done) {
        var spy = function() {
          expect(true).to.be(true);
          done();
        };

        var foo = mixpanel.willTrack('foo', spy);

        foo();
      });

    });

    // tests to write
    // if experiment does not exist, it doesn't choke but errors
    // experiment is correctly extended and has right properties
    // get returns the correct get
    // get does not choke if it does not exist
    // segmentation works correctly
    // segmentation correctly caches

    describe('experiments', function() {
      var experiment;

      beforeEach(function(){
        experiment = mixpanel.experiments('foo');  
      });

      afterEach(function(){
        sinon.restore(experiment,'random');
      });

      it('correctly extends a particular experiment', function() {

        expect(experiment['get']).to.be.ok();
        expect(experiment['segment']).to.be.ok();
        expect(experiment['bar']).to.be.ok();
        
      });

      it('does not fatally error for a nonexistent experiment', function() {
        mixpanel.experiments('non-existent-experiment');  
        expect(console_spy.called).to.be(true);
      });

      it('returns the correct property for a particular experiment', function() {
        expect(experiment.get('bar')).to.be('baz');
      });

      it('does not fatally error for a nonexistent get experiment', function() {
        expect(experiment.get('non-existent-get-property')).to.be(undefined);
        expect(console_spy.called).to.be(true);
      });

      it('A/B segments correctly', function() {

        sinon.stub(experiment,'random').returns(0.75);
        expect(experiment.get('segmentation_test')).to.be('A');
        
        // reset
        sinon.restore(experiment,'random');
        window.localStorage.clear();

        sinon.stub(experiment,'random').returns(0.25);
        expect(experiment.get('segmentation_test')).to.be('B');

      });

      // ideally, this would cache segmentation in the user object. That's a future enhancement.
      it('caches segmentation in localStorage', function() {
        var experiment = mixpanel.experiments('foo');
        var spy = sinon.spy(window.localStorage, 'setItem');
        
        sinon.stub(experiment,'random').returns(0.75);
        expect(experiment.get('segmentation_test')).to.be('A');
        sinon.restore(experiment,'random');
        
        // expect the value to be cached. So this should still be A, no matter what Random says.
        sinon.stub(experiment,'random').returns(0);
        expect(experiment.get('segmentation_test')).to.be('A');
        sinon.restore(experiment,'random');
        
        expect(spy.called).to.be(true);

        sinon.restore(window.localStorage,'getItem');
        spy.restore();
        

      });
      
    });

  });



});
