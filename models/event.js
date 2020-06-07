const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "You have already registered"],
    lowercase: true,
    required: true,
    validate: {
      validator: function (email) {
        console.log(this.name);
        console.log(validator.isEmail(email));
        return validator.isEmail(email);
      },
      message: "Please provide a valid email id",
    },
  },
  idUrl: {
    type: String,
  },
  regType: {
    type: String,
    enum: ["self", "group", "corporate", "others"],
    required: true,
  },
  ticket: {
    type: Number,
    required: true,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
  uniqId: String,
});

module.exports = mongoose.model("Event", eventSchema);
