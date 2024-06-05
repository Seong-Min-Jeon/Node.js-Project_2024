// 유저가 로그인 상태인지 확인
exports.isLoggedIn = (req) => {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
};

// 유저가 로그인 상태이며, 관리자인지 확인
exports.isLoggedInStaff = (req, res) => {  
  if (req.isAuthenticated() && (res.locals.user?.staff == 1)) {
    return true;
  } else {
    return false;
  }
};
