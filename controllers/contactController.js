const db = require("../db");
const { sendContactMail } = require("../mailer/sendContactMail");

const handleContactForm = async (req, res) => {
  const clientId = req.params.clientId;
  const apiKey = req.headers.authorization?.split(" ")[1];
  const { name, email, message } = req.body;

  const [rows] = await db.execute(
    "SELECT email FROM clients WHERE clientId = ? AND apiKey = ?",
    [clientId, apiKey]
  );
  const client = rows[0];

  if (!client) return res.status(401).json({ error: "Client non autorisé" });

  try {
    await sendContactMail(client.email, name, email, message);
    res
      .status(200)
      .json({ success: true, message: "Message envoyé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'envoi du mail." });
  }
};

module.exports = { handleContactForm };
