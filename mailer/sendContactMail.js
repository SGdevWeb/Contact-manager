const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendContactMail(to, fromName, fromEmail, message) {
  await transporter.sendMail({
    to,
    from: `"${fromName}" <contact@sgwebcreation.fr>`,
    replyTo: fromEmail,
    subject: `Nouveau message de ${fromName} via le formulaire de contact`,
    text: message,
  });
}

module.exports = { sendContactMail };
