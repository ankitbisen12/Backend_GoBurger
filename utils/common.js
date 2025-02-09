const passport = require("passport");

exports.isAuth = (user) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.tokenExtractor = (req) => {
  let token = null;
  if (req && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract the token
    }
  }
  return token;
};
