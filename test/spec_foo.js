var expect = require('expect.js');

describe('Array', function(){
  it('should return -1 when the value is not present', function(){
    expect([1,2,3].indexOf(5)).to.be(-1);
  });
});
