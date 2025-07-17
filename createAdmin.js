const bcrypt = require("bcrypt");
const db = require("./db");

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.error("Usage: node createAdmin.js <username> <password>");
  process.exit(1);
}

(async () => {
  try {
    const hash = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO admins (username, passwordHash) VALUES (?, ?)",
      [username, hash]
    );

    console.log(`Admin ${username} créé avec succès`);
    process.exit();
  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err);
    process.exit(1);
  }
})();
