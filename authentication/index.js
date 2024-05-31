exports.isLoggedIn = (req) => {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
};

exports.isLoggedInStaff = (req, res) => {  
  if (req.isAuthenticated() && (res.locals.user?.staff == 1)) {
    return true;
  } else {
    return false;
  }
};