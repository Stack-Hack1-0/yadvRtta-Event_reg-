const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const catchAsync = require("../utils/catchAsync");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Please Enter your name"],
    unique: [true, "The email exists"],
    lowercase: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: "Please provide a valid email id",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: [true, "Please set a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      validator: function () {
        return this.password === this.passwordConfirmation;
      },
    },
  },
  passwordCreatedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
  verificationToken: String,
  valid: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
  this.passwordCreatedAt = new Date().getTime();
});

userSchema.methods.correctPassword = catchAsync(async function (
  password,
  passwordorg
) {
  return await bcrypt.compare(password, passwordorg);
});

userSchema.methods.createVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  console.log({ verificationToken }, this.verificationToken);
  return verificationToken;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
