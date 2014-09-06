require('colors');
var q = require('q');
var exec = require('child_process').exec;

var PLATFORM_DIR = '/app/venmo_platform/current';
//var RESET_DEV_DATA_DIR = 'source /etc/bashrc_extras.d/venmo_platform_env_vars && ' + PLATFORM_DIR + '/reset_dev_data';
var RESET_DEV_DATA = 'source /etc/bashrc_extras.d/venmo_platform_env_vars && PATH="/app/shared/virtualenvs/venmo_platform27/bin:$PATH" && /app/venmo_platform/current/reset_dev_data/reset_dev_data.sh';

//var RESET_DEV_DATA = RESET_DEV_DATA_DIR + '/reset_dev_data.sh';
var DROP_MONGO = RESET_DEV_DATA + '/drop_mongo_data.sh';
var DROP_MYSQL = RESET_DEV_DATA + '/drop_mysql_data.sh';
var RESET_MONGO = RESET_DEV_DATA + '/reset_mongo_data.sh';
var RESET_MYSQL = RESET_DEV_DATA + '/reset_mysql_data.sh';
var RESET_REDIS = 'redis-cli FLUSHDB';

function runCmd(cmd) {
  console.log('Running..', cmd.green);
  var deferred = q.defer();
  exec(cmd, function(err, stdout, stdin) {
    if ( err ) {
      deferred.reject(err);
      console.error(err);
      process.exit(1);
    }

    deferred.resolve(stdout);
  });

  return deferred.promise;
}

function runVagrantCmd(platformCmd) {
  var cmd = "cd $VENMO_CODE/platform && vagrant ssh -c '" + platformCmd + "'";
  return runCmd(cmd);
}

// ssh into vagrant run reset_dev_data
module.exports = {
  cancelTest4668: function() {
    return runVagrantCmd('/vagrant/bin/cancel_test_999_999_9999.sh test4668');
  },
  resetDevData: function() {
    console.log(RESET_DEV_DATA);
    return runVagrantCmd(RESET_DEV_DATA);
  },
  resetMySQL: function() {
    return runVagrantCmd(DROP_MYSQL)
      .then(runVagrantCmd(RESET_MYSQL));
  },
  resetMongo: function() {
    return runVagrantCmd(DROP_MONGO)
      .then(runVagrantCmd(RESET_MONGO));
  },
  resetRedis: function() {
    return runVagrantCmd('redis-cli FLUSHDB');
  },
  fetchVerifcationCode: function() {
    var cmd = 'curl -b "VV=64;" "http://dev.venmo.com/get_test_verification_code"';
    return runCmd(cmd);
  }
};
