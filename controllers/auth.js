const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const { isLoggedIn } = require('../authentication');

// 회원가입 시 작동
exports.join = async (req, res, next) => {
  if(isLoggedIn(req)) {
    return res.redirect('/');
  }
  let { email, password, staff } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.send("<script> alert('이미 가입된 이메일입니다.'); window.location.replace('/login'); </script>");
    }
    const hash = await bcrypt.hash(password, 12);
    
    if(staff=='staff') {staff = '1';}
    else if(staff=='') {staff = '0';}
    else {return res.send("<script> alert('잘못된 관리자 코드입니다.'); window.location.replace('/login'); </script>");}

    await User.create({
      email,
      password: hash,
      staff,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

// 로그인 시 작동
exports.login = (req, res, next) => {
  if(isLoggedIn(req)) {
    return res.redirect('/');
  }
  passport.authenticate('local', (authError, user, info) => {    
    if (authError) {
      console.error(authError);
      return next(authError);
    }    
    if (!user) {
      if(info.message == '비밀번호 오류') {return res.send("<script> alert('잘못된 비밀번호입니다.'); window.location.replace('/login'); </script>");}
      else if(info.message == '비회원') {return res.send("<script> alert('등록되지 않은 회원입니다.'); window.location.replace('/login'); </script>");}
      else {return res.redirect('/')}
    }    
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      if(user.staff) {
        return res.redirect('/manage'); // 관리 페이지로 이동
      } else {
        return res.redirect('/apply'); // 지원 페이지로 이동
      }      
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

// 로그아웃 시 작동
exports.logout = (req, res) => {
  if(!isLoggedIn(req)) {
    return res.redirect('/');
  }
  req.logout(() => {
    res.redirect('/');
  });
};
