const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {    
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {    
    try {
      const user = User.findOne({where: { id }});
      done(null, user);
    } catch(e) {
      console.error(e);
      return done(e);
    }
    
  });

  local();
  kakao();
};
