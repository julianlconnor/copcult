define({
  
  local: {
    amount: '1.01',
    note: 'FOO',
    userId: 123
  },

  paymentResponse: {
    "data": {
      "balance": null,
      "payment": {
        "status": "settled",
        "refund": null,
        "medium": "api",
        "date_completed": "2014-03-28T00:51:02.594638",
        "target": {
          "phone": null,
          "type": "user",
          "email": null,
          "user": {
            "username": "jenny",
            "first_name": "Jenny",
            "last_name": "Kortina",
            "display_name": "Jenny Kortina",
            "about": "No Short Bio",
            "profile_picture_url": "https:\/\/s3.amazonaws.com\/venmo\/no-image.gif",
            "id": "711020561563648231",
            "date_joined": "2011-09-09T00:30:56"
          }
        },
        "audience": "public",
        "actor": {
          "username": "kortina",
          "first_name": "Andrew",
          "last_name": "Kortina",
          "display_name": "Andrew Kortina",
          "about": "No Short Bio",
          "profile_picture_url": "https:\/\/s3.amazonaws.com\/venmo\/no-image.gif",
          "id": "711020519620608702",
          "date_joined": "2011-09-09T00:30:51"
        },
        "note": "hi",
        "amount": 0.01,
        "fee": null,
        "action": "pay",
        "date_created": "2014-03-28T00:51:02.524998",
        "id": "1385796888350950353"
      }
    }
  },

  errorNoId: {
    "error": {
      "message": "User ID was not provided. ",
      "code": 1129
    }
  }
});
