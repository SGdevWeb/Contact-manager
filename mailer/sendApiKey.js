const nodemailer = require("nodemailer");
require("dotenv").config();

const sendApiKeyByEmail = async (client) => {
  const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Ton Service Contact" <${process.env.EMAIL_USER}>`,
    to: client.email,
    subject: "Identifiants de formulaire de contact",
    text: `Bonjour,\n
    Voici les identifiants d'accès pour ${client.name}:\n
    Client ID: ${client.clientId}\n
    Clé API: ${client.apiKey}\n\n
    Cordialement
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendApiKeyByEmail;
