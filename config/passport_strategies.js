var User = require('../apps/api/models/user');
var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;
var settings = require('./settings')();

passport.serializeUser(function(user, done) {
  done(null, user.toJSON());
});

passport.deserializeUser(function(user, done) {
  return new User({ id: user.id }).fetch().then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err, null);
  });
});

function instagramCallback(accessToken, refreshToken, profile, done) {
  var profileJSON = profile._json.data;

  return new User({
    instagramId: profileJSON.id
  })
  .findOrCreate()
  .then(function(user) {
    user.set({
      instagramBio: profileJSON.bio,
      instagramUsername: profileJSON.username,
      instagramProfileWebsite: profileJSON.website,
      instagramProfilePicture: profileJSON.profile_picture,

      instagramFollows: profileJSON.counts.follows,
      instagramFollowers: profileJSON.counts.followed_by,
      instagramNumPosts: profileJSON.counts.media,
      instagramAccessToken: accessToken
    });

    return user.save();
  })
  .then(function(user) {
    done(null, user, accessToken);
  })
  .catch(console.error.bind(console, 'Error while saving new user via Instagram'));
}

module.exports = passport.use(new InstagramStrategy(settings.oauth.instagram, instagramCallback));
