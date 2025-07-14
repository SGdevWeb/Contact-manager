const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const db = require("../db");
const sendApiKeyByEmail = require("../mailer/sendApiKey");

const createClient = async (req, res) => {
  const adminKey = req.headers[x - admin - key];
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({
      error: "Accès refusé",
    });
  }

  const { name, email, quotaMax = 1000 } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Champs requis manquants" });

  const clientId = uuidv4();
  const apiKey = crypto.randomBytes(32).toString("hex");

  try {
    const [rows] = await db.execute(
      "INSERT INTO clients (clientId, apiKay, email, name, quitaMax, messagesSent) VALUES (?,?,?,?,?,0)",
      [clientId, apiKey, email, name, quotaMax]
    );

    const newClient = { clientId, apiKey, email, name };
    await sendApiKeyByEmail(newClient);

    res.status(201).json({ success: true, client: newClient });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la création du client",
    });
  }
};

const getAllClients = async (req, res) => {
  const adminKey = req.headers[x - admin - key];
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: "Accès interdit" });
  }

  try {
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des clients" });
  }
};

module.exports = { createClient, getAllClients };
