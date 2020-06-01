const express = require("express");
const app = express();
const AppError = require("./utils/appError");

const globalErrorController = require("./controllers/globalErrorController");

app.use(express.json());

const userRouter = require("./routes/userRoutes");

app.use("/api/v1/users", userRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(`${__dirname}/client/build`));

  app.get("/", (req, res, next) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
  });
}

app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);

module.exports = app;
