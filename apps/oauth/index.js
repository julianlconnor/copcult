var _ = require('underscore');
var express = require('express');
var app = express();

var request = require('request-promise');

var INSTAGRAM_ACCESS_TOKEN_URL = 'https://api.instagram.com/oauth/access_token';

app.get('/accept_redirect', function(req, res) {
  /**
  * TODO: handle errors-
  *   http://instagram.com/developer/authentication/var
  */
  var code = req.param('code');
  var options = {
    url: INSTAGRAM_ACCESS_TOKEN_URL,
    method: 'POST',
    form: {
      client_id: '215885fd870444219af2ef539a4cfb57',
      client_secret: '2642b11eaffa4ad4b85ee238cae6c129',
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:9001/oauth/accept_redirect',
      code: code
    }
  };
  
  return request(options).then(function(resp) {
    /**
    * Save access token.
    */
    console.log(resp);
  }).catch(function(err) {
    console.error('An error occurred.', err);
    res.send('An error occurred.');
  });
});

module.exports = app;
