const express = require('express');
const {
  renderProfile, renderJoin, renderMain, renderHashtag,
} = require('../controllers/index');

const router = express.Router();

// router.use((req, res, next) => {
  // res.locals.user = req.user;  
  // res.locals.followerCount = req.user?.Followers?.length || 0;
  // res.locals.followingCount = req.user?.Followings?.length || 0;
  // res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  // console.log(res.locals.user);
  // next();
// });

router.get('/', renderMain);

// router.get('/profile', isLoggedInUser, renderProfile);

// router.get('/join', isNotLoggedIn, renderJoin);

// router.get('/hashtag', renderHashtag);

module.exports = router;
