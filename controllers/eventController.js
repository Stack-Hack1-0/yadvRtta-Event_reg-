const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Event = require("../models/event");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ical = require("ical-generator");
const cal = ical({ domain: "peakydevelopers.com", name: "peaky developers" });
dotenv.config();

// cal.createEvent({
//   start: new Date().toISOString(),
//   end: new Date().toISOString(),
//   timestamp: new Date().toISOString(),
//   summary: "Our bloody peaky Event",
//   organizer: "peaky developers <peaky@developers.com>",
// });

// const p = __dirname + "/uploads/" + "invite.ics";

// cal.saveSync(p);

// let eve = cal.toString();

const transporter = nodemailer.createTransport(
  // {
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: "b518045@iiit-bh.ac.in",
  //     accessToken:
  //       "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",
  //   },
  // }

  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getSubmissions = catchAsync(async (req, res, next) => {
  let data;
  if (req.params.id === "all") {
    data = await Event.find().sort({ regDate: "desc" });
  } else
    data = await Event.find({ regType: req.params.id.toLowerCase() }).sort({
      regDate: "desc",
    });
  console.log(data);
  res.status(200).json({
    status: "success",
    length: data.length,
    data,
  });
});

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
// controller for submit button in event registration form
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
// controller for preview after submit
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: event,
  });
});
// controller for success screen after registration
exports.getRegid = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError("Event not found!", 404));
  }
  const uniqId = event._id;
  res.status(200).json({
    status: "success",
    uniqId,
  });
  transporter.sendMail({
    to: event.email,
    from: "b518045@iiit-bh.ac.in",
    subject: "Successful Registration",
    text: "Thanks for registrtaion !!",
    html: `
    <p>This email confirms your registration for Event Stack '20. </p>
    <p>Join the <a href="#">event</a> on Tuesday, 9th June at 3:00PM</p>
    <h2>Click to download the <a href="http://localhost:5000/event/pass/${uniqId}">pass.</a></h2>
    <p>Thank You and Stay Safe.</p>
    <p>Team Creator</p>
    `,
    // icalEvent: {
    //   content: eve,
    //   method: "request",
    // },
  });
});

//controller to get pass pdf from the email
exports.getPass = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new AppError("Event not found!", 404));
  }
  const passName = "pass-" + event._id + ".pdf";
  const passPath = path.join("data", "pass", passName);
  const pdfDoc = new pdfkit();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline: filename="' + passName + '"');
  pdfDoc.pipe(fs.createWriteStream(passPath));
  pdfDoc.pipe(res);
  pdfDoc
    .fontSize(30)
    .fillColor("green")
    .text("Event Pass", { underline: true, lineGap: 10 });
  pdfDoc
    .image(event.idUrl, { width: 300, height: 300, align: "center" })
    .moveDown(0.5);
  pdfDoc
    .fontSize(15)
    .fillColor("black")
    .text("Pass No:  " + event._id, { lineGap: 5 });
  pdfDoc.fontSize(15).text("Name:  " + event.fullname, { lineGap: 5 });
  pdfDoc.fontSize(15).text("email:  " + event.email, { lineGap: 5 });
  pdfDoc
    .fontSize(15)
    .text("Registration-Type:  " + event.regType, { lineGap: 5 });
  pdfDoc.fontSize(15).text("Tickets booked:  " + event.ticket, { lineGap: 5 });
  pdfDoc.end();
});
