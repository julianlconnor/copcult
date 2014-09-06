/* global before, after, beforeEach, it, expect */

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var wd = require('wd');
var asserters = wd.asserters;
var helpers = require('./helpers');

chai.use(chaiAsPromised);
chai.should();

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser;
var asserters = wd.asserters;

before(function() {
  this.timeout(0);
  browser = wd.promiseChainRemote();
  return browser
    .init({ browserName: 'firefox' })
    .fail(browser.quit);
});

after(function() {
  return browser.quit();
});

describe('Integration Tests', function() {

  describe('Signup Flow', function() {
    /* jshint evil: true */
    this.timeout(0);

    beforeEach(function() {
      return helpers.resetDevData().then(function() {
        return browser.get('http://dev.venmo.com/w/signup');
      });
    });

    it('should be possible to signup', function() {
      // 1. at the signup page
      // 2. fill in the form for a new user and submit
      // 3. get the verifation code
      // 4. at the verify page, enter the code and submit
      // 5. should end up on the welcome page

      return browser
        .waitForElementByCss('.inputs')
        .elementByCss('[aria-label="first name"]').type('Selenium')
        .elementByCss('[aria-label="last name"]').type('Boyt')
        .elementByCss('[aria-label="email"]').type('seleniumboyt@venmo.com')
        .elementByCss('[aria-label="phone number"]').type('347-267-4668')
        .elementByCss('[aria-label="password"]').type('asdfasdf')
        .elementByCss('button.submit').click()
        .waitForElementByCss('.signup.verify', 15000)
        .then(function() {
          return browser.eval('window.location.pathname')
            .should.eventually.include('/w/signup/verify');
        })
        .then(helpers.fetchVerifcationCode)
        .then(function(code) {
          // note: the error is handled here in the helper (quits the test)
          return browser
            .elementByCss('.signup.verify form input').type(code)
            .elementByCss('button.submit').click();
        })
        .waitForElementByCss('.signup.welcome', 15000)
        .then(function() {
          return browser.eval('window.location.pathname')
            .should.eventually.include('/w/signup/welcome');
        });
    });

  });


  describe('Claim Your Money Flow', function() {
    /* jshint evil: true */
    this.timeout(0);

    beforeEach(function() {
      return helpers.resetDevData().then(function() {
        return browser.get('http://dev.venmo.com/w/claims/A_CLAIM_ID?key=A_CLAIM_KEY');
      });
    });

    it('is possible to claim via user first flow', function() {
      return browser
        .waitForElementByCss('.inputs')
        .elementByCss('[aria-label="first name"]').type('Selenium')
        .waitForElementByCss('button.cash-out', asserters.isDisplayed, 15000)
        .elementByCss('[aria-label="last name"]').type('Boyt')
        .elementByCss('[aria-label="phone number"]').type('347-267-4668')
        .elementByCss('[aria-label="password"]').type('asdfasdf')
        .elementByCss('button.cash-out').click()
        .waitFor(asserters.textInclude('Money Accepted'), 15000);
    });

    it('is possible to claim via bank first flow', function() {
      return browser
        .waitForElementByCss('.inputs')
        .elementByCss('[aria-label="first name"]').click()
        .waitForElementByCss('button.cash-out', asserters.isDisplayed, 15000)
        .elementByCss('a.show-funding-toggle').click()
        .elementByCss('[aria-label="routing number"]').type('999999963')
        .elementByCss('[aria-label="account number"]').type('1313')
        .elementByCss('[aria-label="confirm account number"]').type('1313')
        .elementByCss('button.show-user-add').click()
        .waitForElementByCss('button.cash-out', asserters.isDisplayed, 15000)
        .elementByCss('[aria-label="first name"]').type('Selenium')
        .elementByCss('[aria-label="last name"]').type('Boyt')
        .elementByCss('[aria-label="phone number"]').type('347-267-4668')
        .elementByCss('[aria-label="password"]').type('asdfasdf')
        .elementByCss('.button.cash-out').click()
        .waitFor(asserters.textInclude('Money Accepted'), 15000);
    });

    it('is possible to sign in and claim your doge', function() {
      // protip: be as specific as you can when finding elements by css, selenium will
      // fail when there are multiple match results
      return browser
        .waitForElementByCss('.inputs')
        .elementByCss('a.login-link').click()
        .waitForElementByCss('.login-form', asserters.isDisplayed, 15000)
        .elementByCss('.login-form [aria-label="phone, email, or username"]').type('shreyans')
        .elementByCss('.login-form [aria-label="password"]').type('tv')
        .elementByCss('button.login').click()
        .waitFor(asserters.textInclude('Money Accepted'), 20000);
    });
  });

});
