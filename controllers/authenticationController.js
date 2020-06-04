const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const util = require("util");
const crypto = require("crypto");

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("provide valid email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 404));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  if (token) {
    res.cookie("jwt", token);
  }

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.sendProtect = catchAsync(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("user is not logged in!"));
  }

  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_PRIVATE_KEY
  );
  console.log(decoded);
  const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
  if (!freshUser) {
    return next(new AppError("User does not exist!"));
  }
  req.user = freshUser;
  next();
});
