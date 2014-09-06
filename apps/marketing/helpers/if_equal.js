/**
* http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
*/
module.exports.if_equals = function(lvalue, rvalue, options) {
  if ( arguments.length < 3 ) {
    throw new Error("Handlebars Helper equal needs 2 parameters");
  }
  if( lvalue!==rvalue ) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};
