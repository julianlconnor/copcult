/**
 * This defines Tracking Events for Mixpanel.
 *
 * These are collected in a single file to make it easier
 * to cross reference all the events we're tracking.
 *
 * When tracking, pass the key name as a string to Mixpanel.
 * It will attempt to find the right event name, but if it doesn't
 * exist it won't choke, it will simply pass along the capitalized
 * key name and console.error.
 */
define({
  /* Claim Money Flow */
  'CLAIM_LANDING': 'Payment Invite Clicked',
  'CLAIM_BANK_INFO_ADDED': 'Bank Information Added',
  'CLAIM_SWITCH_TO_USER': 'Switch to Venmo',
  'CLAIM_SWITCH_TO_BANK': 'Switch to Bank',
  'CLAIM_ERROR': 'Claim Error',
  'CLAIM_USER_INFO_ADDED': 'Account Information Added',
  'CLAIM_SUCCESS': 'Claim Success',
  'CLAIM_GTA': 'Claim Get The App Click',

  /* Signup Form */
  'SIGNUP_LANDING': 'Signup Page View',
  'SIGNUP_INFO_ADDED': 'Signup Information Added',
  'SIGNUP_INFO_ERROR': 'Signup Information Error',
  'SIGNUP_VERIFY': 'Verify Phone View',
  'SIGNUP_WELCOME': 'Signup Welcome View',
  'SIGNUP_GTA': 'Get The App Click',
  'SIGNUP_FACEBOOK_REMOVED': 'Signup Facebook Removed',
  'SIGNUP_FACEBOOK_ADDED': 'Signup Facebook Added',
  'FACEBOOK_CONNECT_CLICK': 'Facebook Connect Click',

  /* Homepage signup A/B test */
  'SIGNUP_HOMEPAGE_VIEW': 'Homepage View',

  /* Feed Invites Signup Flow*/
  'FEED_INVITE_LANDING': 'Feed Invite - Referral Page Landing',
  'FEED_INVITE_JOIN_BUTTON_CLICK': 'Feed Invite - Join Button Click',

  /* Pay dialog */
  'PAY_DIALOG_VIEW': 'Payment Dialog - View',
  'PAY_DIALOG_SUCCESS': 'Payment Dialog - Made transaction',
  'PAY_DIALOG_ERROR': 'Payment Dialog - Error'
});
