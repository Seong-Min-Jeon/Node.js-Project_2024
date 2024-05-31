const { User, Post, Hashtag } = require('../models');
const { isLoggedIn, isLoggedInStaff } = require('../authentication');

exports.renderLogin = async (req, res) => {  
  if(isLoggedInStaff(req)) {
    //res.render(''); 관리 페이지로 이동
  } else if(isLoggedIn(req)) {
    //res.render(''); 지원 페이지로 이동
  } else {
    res.render('login'); // 로그인 페이지로 이동
  }
}

exports.renderJoin = (req, res) => {
  res.render('join');
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};