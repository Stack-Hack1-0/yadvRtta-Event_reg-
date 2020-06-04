const mongoose = require("mongoose");

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
    required: true,
  },
  idUrl: {
    type: String,
  },
  regType: {
    type: String,
    enum: ['self','group','corporate','others'],
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
