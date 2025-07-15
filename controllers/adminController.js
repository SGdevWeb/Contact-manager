const db = require("../db");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.execute("SELECT * FROM admins WHERE username = ?", [
    username,
  ]);
  const admin = rows[0];
  if (!admin) return res.status(401).json({ error: "Utilisateur inconnu" });

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid)
    return res.status(401).json({ error: "Mot de passe incorrect" });

  req.session.isAdmin = true;
  res.json({ success: true });
};

const checkSession = (req, res) => {
  if (req.session.isAdmin) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la déconnexion :", err);
      return res.status(500).json({ error: "Erreur lors de la déconnexion" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
};

module.exports = { login, checkSession, logout };
