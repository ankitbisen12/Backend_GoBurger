const passport = require("passport");

exports.isAuth = () => (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = user; // Attach the authenticated user to req.user
    next(); // Proceed to the next middleware
  })(req, res, next);
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

exports.userInfo = (user) => {
  return {
    id: user.id,
    name: user.name,
    addresses: user.addresses,
    email: user.email,
    role: user.role,
    phone: user.mobileNo,
    avatar: user.avatar,
  };
};
