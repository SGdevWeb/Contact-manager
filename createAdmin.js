const bcrypt = require("bcrypt");
const db = require("./db");

(async () => {
  const username = "admin";
  const password = "supersecret";
  const hash = await bcrypt.hash(password, 10);

  await db.execute(
    "INSERT INTO admins (username, passwordHash) VALUES (?, ?)",
    [username, hash]
  );

  console.log("Admin créé avec succès");
  process.exit();
})();
