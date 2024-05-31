exports.isLoggedIn = (req) => {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
};

exports.isLoggedInStaff = (req) => {
  if (req.isAuthenticated() && (req.user?.staff == 1)) {
    return true;
  } else {
    return false;
  }
};