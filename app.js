const express = require("express");
const morgan = require("morgan");
const app = express();
const menuRouter = require("./routes/menuRoutes");
const dessertRouter = require("./routes/dessertsRoutes");
const snacksRouter = require("./routes/snacksRoutes");
const burgerRouter = require("./routes/burgerRoutes");
const burgerWrapsRouter = require("./routes/burgerWrapsRoutes");
const beveragesRouter = require("./routes/beveragesRoutes");
const mealRouter = require("./routes/mealRoutes");
const burgerMealRouter = require("./routes/burgerMealRoutes");
const addonRouter = require("./routes/addonRoutes");

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/desserts", dessertRouter);
app.use("/api/v1/snacks", snacksRouter);
app.use("/api/v1/burgers", burgerRouter);
app.use("/api/v1/burgerWraps", burgerWrapsRouter);
app.use("/api/v1/beverages" , beveragesRouter);
app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/burgerMeal", burgerMealRouter);
app.use("/api/v1/addons",addonRouter);

app.all("*", (req, res, next) => {
  console.log(`Can't find ${req.originalUrl} on this server`, 404);
});

module.exports = app;
