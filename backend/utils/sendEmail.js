const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your email
    pass: process.env.EMAIL_PASS,   // your app password
  },
});

module.exports = async function sendEmail(to, subject, html) {
  await transporter.sendMail({
    from: `"Infra Report" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
