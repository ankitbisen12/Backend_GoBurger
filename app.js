const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const menuRouter = require("./routes/menuRoutes");
const dessertRouter = require("./routes/dessertsRoutes");
const snacksRouter = require("./routes/snacksRoutes");
const burgerRouter = require("./routes/burgerRoutes");
const burgerWrapsRouter = require("./routes/burgerWrapsRoutes");
const beveragesRouter = require("./routes/beveragesRoutes");
const mealRouter = require("./routes/mealRoutes");
const burgerMealRouter = require("./routes/burgerMealRoutes");
const addonRouter = require("./routes/addonRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
const { isAuth, sanitizeUser, tokenExtractor } = require("./utils/common");
const User = require("./models/UserModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// console.log("JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);

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
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/desserts", dessertRouter);
app.use("/api/v1/snacks", snacksRouter);
app.use("/api/v1/burgers", burgerRouter);
app.use("/api/v1/burgerWraps", burgerWrapsRouter);
app.use("/api/v1/beverages", beveragesRouter);
app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/burgerMeal", burgerMealRouter);
app.use("/api/v1/addons", addonRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", isAuth(),cartRouter);

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      console.log("User", user);

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
