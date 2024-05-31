const { isLoggedInStaff } = require('../authentication');

exports.renderManageMain = (req, res) => {  
  if(isLoggedInStaff(req, res)) {
    res.render('manageMain');
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); window.location.replace('/'); </script>");
  }
}