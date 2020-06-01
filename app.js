const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const AppError = require("./utils/appError");

const globalErrorController = require("./controllers/globalErrorController");

app.use(express.json());


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const userRouter = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(bodyParser.urlencoded({extended:false}));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use("/api/v1/users", userRouter);
app.use("/event",eventRoutes);

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
