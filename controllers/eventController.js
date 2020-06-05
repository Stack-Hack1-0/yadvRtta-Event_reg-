const uniqid = require("uniqid");
const Event = require("../models/event");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getSubmissionStat = catchAsync(async (req, res, next) => {
  const stats = await Event.aggregate([
    {
      $group: {
        _id: { $toUpper: "$regType" },
        numRegistrations: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getSubmissions = catchAsync(async (req, res, next) => {
  let data;
  if (req.params.id === "all") {
    data = await Event.find();
  } else data = await Event.find({ regType: req.params.id.toLowerCase() });
  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

exports.postSubmit = catchAsync(async (req, res, next) => {
  const event = {
    fullname: req.body.name,
    mobile: req.body.mob,
    email: req.body.em,
    idUrl: req.file.path.replace("\\", "/"),
    regType: req.body.reg,
    ticket: req.body.tik,
  };
  const data = await Event.create(event);
  console.log(data);
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: event,
  });
});

exports.getUniqid = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError("Event not found!", 404));
  }
  event.uniqId = event._id;
  await event.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    uniqId,
  });
});
