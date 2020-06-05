const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();
const AppError = require("./utils/appError");
const uniqid = require("uniqid");
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
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uniqid("", `-${file.originalname}`));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/PNG"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const adminRouter = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("file"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/v1/admin", adminRouter);
app.use("/event", eventRoutes);

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
