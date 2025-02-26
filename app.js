const express = require("express");
const app = express();
//-------------library imports
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const dotenv = require("dotenv");
//-------------router imports
const routes = require("./utils/routerVar");
//-------------other imports
const { isAuth, sanitizeUser, tokenExtractor } = require("./utils/common");
const User = require("./models/UserModel");
dotenv.config({ path: "./config.env" });

const opts = {};
opts.jwtFromRequest = tokenExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY; //TODO: this should not be in code.

app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
app.use(passport.authenticate("session"));
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

//cutsom routes
app.use("/api/v1/menu", routes.menuRouter);
app.use("/api/v1/desserts", routes.dessertRouter);
app.use("/api/v1/snacks", routes.snacksRouter);
app.use("/api/v1/burgers", routes.burgerRouter);
app.use("/api/v1/burgerWraps", routes.burgerWrapsRouter);
app.use("/api/v1/beverages", routes.beveragesRouter);
app.use("/api/v1/meal", routes.mealRouter);
app.use("/api/v1/burgerMeal", routes.burgerMealRouter);
app.use("/api/v1/addons", routes.addonRouter);
app.use("/api/v1/auth", routes.authRouter);
app.use("/api/v1/users", routes.userRouter);
app.use("/api/v1/cart", isAuth(), routes.cartRouter);
app.use("/api/v1/orders", isAuth(), routes.orderRouter);
app.use("/api/v1/faq", routes.faqSupportRouter);
app.use("/api/v1/address", routes.addressRouter);

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      // console.log("User inside local", user);

      if (!user) {
        done(null, false, { message: "Invalid Credentials" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" });
          }
          const token = jwt.sign(
            sanitizeUser(user),
            process.env.JWT_SECRET_KEY
          );
          done(null, { id: user.id, role: user.role, token });
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

//this creates session variables req.user on being called from callbacks
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);

      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//this creates session variables req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

//this change session variable req.user when called from authorized request.
passport.deserializeUser(function (user, cb) {
  console.log("deseralize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server`, 404);
});

module.exports = app;
