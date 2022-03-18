const transporter = require("../config/smtp");

const sendEmail = async (options) => {
  await transporter.sendMail({
    from: "CookForMe Meals",
    to: options.toEmail,
    subject: options.subject,
    text: options.text,
  });
};

module.exports = sendEmail;
