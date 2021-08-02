const nodemailer = require("nodemailer");

module.exports = sendEmail = async (information) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  //   transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "tianaomeng@gmail.com",
  //       pass: "ww3952052",
  //     },
  //   });
  //
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_MAIL}>`,
    to: information.email,
    subject: information.subject,
    text: information.message,
  };

  await transporter.sendMail(message);
};
