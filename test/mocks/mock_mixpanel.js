define([
  'sinon',
  'q',
], function(sinon, q) {

  var fakeMixpanel = null;

  return (function() {
    if (fakeMixpanel) {
      return fakeMixpanel;

    } else {

      return {
        track: sinon.stub().returns(q('ok'))
      };
    }
  })();

});
