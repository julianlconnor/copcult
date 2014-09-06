define([
  'q',
  'underscore',
  'mixpanel.events',
  'mixpanel.experiments'
], function(q, _, events, experiments) {
  /**
  * Provides a wrapper around the Mixpanel library.
  *
  * This serves to cache tracking data in order to persist for the life of a session
  * and across sessions (via localStorage, if present).
  */
  var Mixpanel = function() {
    var prepend = '';
    var params = {};
    var storageKey = 'venmo-claim-flow-mp';
    var trackingTimeout = 2000;

    // cache the mixpanel parameters locally so we can persist sessions
    if ( store(storageKey) ) {
      params = JSON.parse(store(storageKey));
    }

    function mpLoaded() {
      var dfd = q.defer();
      var inc = 50; // 5 seconds
      var mixpanelListener = function( interval ) {
        if ( window.mixpanel ) {
          dfd.resolve(window.mixpanel);
        } else {
          interval = interval + 1 || 1;
          if ( interval < inc ) {
            setTimeout(function(){
              mixpanelListener(inc++);
            }, 100);
          } else {
            dfd.reject('Mixpanel Timeout Error');
          }
        }
      };
      mixpanelListener();

      return dfd.promise;
    }

    /**
    * This is a simple wrapper for the native localStorage to prevent fatal errors
    * in older browsers, as well as Private Browsing in Safari
    *
    * @param {String} key - The key to request or set
    * @param {String} [val] - An optional value to set the key to
    */
    function store(key, val) {
      try {
        if ( Object.prototype.toString.call(key) === '[object Array]' ) {
          key = key.join('');
        }
        // key should be hashed so a user cannot manually change it (easily)

        if ( val !== undefined ) {
          return window.localStorage.setItem(key, val);
        } else {
          return window.localStorage.getItem(key);
        }
      // localStorage does not exist
      } catch(error) { return false; }
    }

    /**
    * This iterates over an object's keys and adds a prepend string to each one.
    * The purpose of this is to make it easier to track flows within Mixpanel.
    *
    * @param {Object} opts - An object of parameters intended to be passed to Mixpanel
    */
    function prependKeys(opts) {
      var obj = {};
      _.each(opts, function(val, key) {
        obj[prepend+key] = val;
      });
      return obj;
    }

    /**
    * A wrapper for the mixpanel tracking function that will automatically include
    * previously cached attributes in any call to tracking. Also automatically maps
    * a passed-in string to our defined config events.
    *
    * Returns a promise that will be resolved on success, or reject on failure or timeout.
    *
    * Timeout length is determiend by trackingTimeout, set by default to 2000 but can be
    * overwritten (for instance, via tests.
    *
    * @params {String} page - The page to track
    * @params {Object} [opts] - An optional object of parameters to send as tracking data
    */
    function track(page, opts) {
      var dfd = q.defer();
      var timer;
      // parse our passed-in key string
      if ( events[page] ) {
        page = events[page];
      } else {
        console.error('Tracking Undefined Mixpanel Event', page);
      }

      // set up a timer in case mixpanel times out
      timer = setTimeout(function(){
        dfd.reject('timeout');
      }, this.trackingTimeout);

      // passes our stored parameters with any additional parameters to mixpanel's tracker
      // now we need two sets of try / catch blocks for both sets of promises
      try {
        mpLoaded().then(function(mp) {
          try {
            mp.track(page, _.extend(params, prependKeys(opts))).then(function(){
              dfd.resolve(arguments);
              clearTimeout(timer);
            });
          } catch(err) {
            dfd.reject(err);
            clearTimeout(timer);
          }
        });
      } catch(err) {
        dfd.reject(err);
        clearTimeout(timer);
      }
      return dfd.promise;
    }

    /*
    * A wrapper for mixpanel tracking that returns a function that will track
    * when the returned method is invoked.
    *
    * @param {String} page - The page to track
    * @param {Function} fn - The function to call when invoked
    */
    function willTrack(page, fn) {
      return function() {
        track(page);
        return fn.apply(this, arguments);
      };
    }

    /**
    * This updates the local parameters that are passed along with every track request to Mixpanel
    *
    * @param {Object} opts - List of parameters to persist 
    */
    function update(opts) {
      params = _.extend(params, prependKeys(opts));
      store(storageKey,JSON.stringify(params));
    }

    /**
    * This wraps Mixpanel's identify function to store options locally.
    *
    * @param {Object} [opts] - An optional object of parameters to send as tracking data.
    *        This is in addition to our stored parameters
    */
    function identify(opts) {
      prepend = (opts.prepend) ? opts.prepend + ': ' : '';
      update(opts.params);
      mpLoaded().then(function(mp){
        mp.identify(opts.id);
      });
    }

    /**
    * This wraps Mixpanel's get_distinct_id function to prevent potential Mixpanel
    * errors from breaking other flows.
    */
    function get_distinct_id() {
      var dfd = q.defer();
      mpLoaded().then(function(mp){
        try {
          dfd.resolve(mp.get_distinct_id());
        } catch(err) {
          dfd.reject({ msg: 'There was an error getting distinct ID from mixpanel', err: err });
        }
      });
      //return distinct_id;
      return dfd.promise;
    }

    /**
     * This defines our base Experiment class. Provides helper functions for
     * running A/B tests and testing isolated functionality.
     */
    var Experiment = {
      /**
       * Returns a random number. Exists solely for testing purposes (so it can be stubbed)
       **/
      random: function() {
        return Math.random();
      },
      /**
       * Returns a boolean appropriate for writing a ternary statement that allows us to
       * segment users based on a percentage.
       *
       * @param {Float} percentage - The percentage we're comparing to. Refers to the likelihood
       *        that the A case will be chosen. So a value of .75 means that the A case
       *        occurs 75% of the time.
       * @param {String} [getKey] - Allows us to cache the output of segment,
       *        to persist the A/B test across sessions.
       **/
      segment : function(percentage, getKey) {
        var key, determineTest;

        determineTest = function() {
          return this.random() >= percentage;
        }.bind(this);

        if ( getKey ) {
          key = ['experiment', this.name, getKey];
          if ( !store(key) ) {
            store(key, determineTest());
          }
          return store(key) === 'true' ? true : false;
        } else { // so, we don't want to store this locally
          return determineTest();
        }
      },
      /**
       * Returns the given result of an A/B test defined on an experiment.
       *
       * @param {String} key - The key we are querying on the experiment.
       * @param {Object} [options] - Options passed to the A/B test
       **/
      get : function(key, options) {
        if ( typeof(this[key]) === 'function') {
          return this[key]( options );
        } else {
          console.error('Mixpanel: Request for key that doesn\'t exist', key);
        }
      }
    };

    /**
    * This will run a particular defined experiment, and extends that
    * experiment with the Experiment Base class.
    *
    * See above for more information on Experiment class.
    *
    * @param {String} experiment - Name of the experiment we wish to run,
    *        as defined in our experiments config file.
    */
    function runExperiment(experiment) {
      if ( experiments[experiment] ) {
        // we also pass the name of the experiment to the object, so we can
        // reference the experiment name to identify our locally stored keys
        return _.extend(Experiment, experiments[experiment], {name: experiment} );
      } else {
        console.error('Mixpanel Experiment does not exist', experiment);
        return Experiment;
      }
    }

    return {
      track: track,
      willTrack: willTrack,
      identify: identify,
      update: update,
      get_distinct_id: get_distinct_id,
      events: events,
      experiments: runExperiment,
      trackingTimeout: trackingTimeout,
      mpLoaded: mpLoaded
    };
  };

  return new Mixpanel();
});
