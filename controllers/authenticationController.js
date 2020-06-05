const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const util = require("util");

exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    data: null,
  });
};
exports.loginUser = (req, res, next) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return next(new AppError("provide valid user or password", 400));
  }
  if (user != "admin" || password != "password") {
    return next(new AppError("incorrect user or password", 404));
  }
  const token = jwt.sign({ id: user }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (token) {
    res.cookie("jwt", token);
  }
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.sendProtect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_KEY
  );
  console.log(decoded);
  next();
});
