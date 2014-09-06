define({

  success: {
    'is_valid': true,
    'parts': {
      'local_part': 'julian@venmo.com',
      'domain': 'venmo.com',
      'display_name': ''
    },
    'address': 'julian@venmo.com',
    'did_you_mean': null
  },

  didYouMean: {
    'is_valid': false,
    'parts': {
      'local_part': null,
      'domain': null,
      'display_name': null
    },
    'address': 'julian@gmail.con',
    'did_you_mean': 'julian@gmail.com'
  },

  error: {
    'is_valid': false,
    'parts': {
      'local_part': null,
      'domain': null,
      'display_name': null
    },
    'address': 'julian#gmail.con',
    'did_you_mean': null
  }

});
