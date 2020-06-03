const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const AppError = require("./utils/appError");

const globalErrorController = require("./controllers/globalErrorController");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, file.filename + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if(
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/PNG' 
  ){
      cb(null, true);
  }else{
      cb(null, false);
  }
}

app.use(express.json());
app.use(cors());
const userRouter = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(
  multer({ storage: storage, fileFilter: fileFilter }).single('image')
);
app.use('/images',express.static(path.join(__dirname,'images')));


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
