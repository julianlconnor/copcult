define({
  valid: {
    firstName: 'Thomas',
    lastName: 'Boyt',
    email: 'thomasboyt@me.com',
    phone: '1231231234',
    password: 'foofighters',
    passwordConfirm: 'foofighters'
  },
  me: {
    "data": {
      "username": "kortina",
      "picture": "https:\/\/graph.facebook.com\/100003850208660\/picture?type=large",
      "is_business": false,
      "name": "Andrew Kortina",
      "firstname": "Andrew",
      "lastname": "Kortina",
      "email": "kortina@gmail.com",
      "phone": "16469124010",
      "balance": 0.58,
      "external_id": "711020519620608702",
      "id": "4",
      "sharing": {"default": [], "public": 1, "allowed": ["twitter"]},
      "audience": "public"
    }
  },
  apiMe: {
    "data": {
      "username": "kortina",
      "id": "711020519620608702",
      "profile_picture_url": "https:\/\/graph.facebook.com\/100003850208660\/picture?type=large",
      "display_name": "Andrew Kortina",
      "first_name": "Andrew",
      "last_name": "Kortina",
      "email": null,
      "phone": null,
      "date_joined":"2013-02-10T21:58:05"
    }
  },
  you: {
    "data": {
      "username": "julian",
      "picture": "https:\/\/graph.facebook.com\/100003850208660\/picture?type=large",
      "is_business": false,
      "name": "Julian Connor",
      "firstname": "Julian",
      "lastname": "Connor",
      "email": "julianlconnor@gmail.com",
      "phone": "12015320947",
      "balance": 0.8,
      "external_id": "910925710929",
      "id": "8"
    }
  },
  apiYou: {
    "data": {
      "id": "12345",
      "first_name": "Test",
      "last_name": "User",
      "display_name": "Test User",
      "user_name": "testuserlol",
      "profile_picture_url": "https://pics.venmo.com/kortinapic.jpg",
      "about": "Hello world!",
      "date_joined": "01012000010101Z",
      "friends_count": 100,
      "is_friend": false,
      "friend_request": {
        "status": "incoming"
      }
    }
  },
  userPhoneAlreadyTaken: {
    responseJSON: {
      "data":{
        "error":{
          "message":"An error occured",
          "errors":[
            {
              "status_code":"ERROR",
              "message":"That phone number is already registered in our system.",
              "error_type":"USER_PHONE_ALREADY_TAKEN",
              "error_code":1109,
              "api_message":"That phone number is already registered in our system."
            }
          ]
        }
      }
    }
  },
  userEmailAlreadyTaken: {
    responseJSON: {
      "data":{
        "error":{
          "message":"An error occured",
          "errors":[{
            "status_code":"ERROR",
            "message":"That email is already taken.",
            "error_type":"USER_EMAIL_ALREADY_TAKEN",
            "error_code":1109,
            "api_message":"That email is already taken."
          }]
        }
      }
    }
  },
  facebookAlreadyTaken: {
    responseJSON: {
      "data": {
        "error": {
          "message": "A user has already connected with that Facebook Account.  Please use another one.", 
          "code": 223
        }
      }
    }
  }
});
