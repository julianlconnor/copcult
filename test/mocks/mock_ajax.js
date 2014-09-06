define([
  'sinon',
  'q',
], function(sinon, q) {
  var stub = sinon.stub();
  stub.returns(q('success'));
  return stub;
});
