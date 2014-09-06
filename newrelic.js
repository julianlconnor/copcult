/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
module.exports.config = {
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info',
    filepath : 'stdout'
  },
  /**
   * High Security
   *
   * High security mode (v2) is a setting which prevents any sensitive data from
   * being sent to New Relic. The local setting must match the server setting.
   * If there is a mismatch the agent will log a message and act as if it is
   * disabled.
   *
   * Attributes of high security mode (when enabled):
   *  * requires SSL
   *  * does not allow capturing of http params
   *  * does not allow custom params
   *
   * To read more see: https://docs.newrelic.com/docs/subscriptions/high-security
   */
  high_security : true

};
