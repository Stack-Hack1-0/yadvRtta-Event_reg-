const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendMail = require("../utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.signupUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
  });
  //   const user1 = User.findOne({ email: user.email });
  const verificationToken = user.createVerificationToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:3000/api/v1/users/verifyemail/${verificationToken}`;

  try {
    await sendMail(user.email, resetUrl, "Verify your email");
  } catch (er) {
    console.log(er);
    return next(new AppError("error in sending verification url.."));
  }

  res.status(200).json({
    status: "success",
    user: user,
  });
});

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
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.sendProtect = asyncCatch(async (req, res, next) => {
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

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({ verificationToken: hashedToken });
  if (!user) {
    return next(new AppError("user doesn't exist", 400));
  }
  user.isActive = true;
  user.verificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "email verified",
  });
});
