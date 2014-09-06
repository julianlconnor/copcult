/**
 * This defines our Experiments.
 *
 * Experiments are used to define A/B Tests and for presenting
 * prototype functionality to specific segments of users.
 */
define({
  'CLAIM_GET_THE_APP': {
    h3: function() {
      return (this.segment(0.5, 'h3')) ? 'Money Accepted' : 'Money Accepted';
    }
  }
});
