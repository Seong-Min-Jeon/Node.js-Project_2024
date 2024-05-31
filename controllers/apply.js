const { isLoggedIn, isLoggedInStaff } = require('../authentication');

exports.renderApplyMain = (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  } else if(isLoggedIn(req)) {
    res.render('applyMain');
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}