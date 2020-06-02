const express = require("express");
const app = express();
const AppError = require("./utils/appError");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorController = require("./controllers/globalErrorController");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use((req, res, next) => {
  if (req.cookies.jwt) {
    console.log(req.cookies.jwt);
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }
  next();
});

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
