const child_process = require("child_process");
const util = require("util");

child_process.exec = util.promisify(child_process.exec);

const sendMail = async (emailId, resetUrl, message) => {
  try {
    await child_process.exec(
      `py ${__dirname}/mail.py ${emailId} ${resetUrl} ${message}`
    );
  } catch (er) {
    console.log(er);
  }
};

// const nodemailer = require("nodemailer");

// const sendMail = async (emailId, resetUrl, message) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "896d5d909cb530",
//       pass: "10fac59536cf69",
//     },
//   });
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: emailId, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: message, // plain text body
//     html: `<a>${resetUrl}</a>`, // html body
//   });
//   console.log(info);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// };

module.exports = sendMail;
