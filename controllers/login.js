const { isLoggedIn, isLoggedInStaff } = require('../authentication');

exports.renderLogin = (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    res.redirect('/manage'); // 관리 페이지로 이동
  } else if(isLoggedIn(req)) {
    res.redirect('/apply'); // 지원 페이지로 이동
  } else {
    res.render('login'); // 로그인 페이지로 이동
  }
}

exports.renderJoin = (req, res) => {
  res.render('join'); // 회원가입 페이지로 이동
};