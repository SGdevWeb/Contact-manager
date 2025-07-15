const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const clientRoutes = require("./routes/clients");
const path = require("path");
const session = require("express-session");
const { requireAdmin } = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("views"));
app.use(
  session({
    secret: "Uneclétemporaireachanger",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false },
  })
);

app.use("/api/clients", requireAdmin, clientRoutes);

// page de connexion
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// page formulaire admin
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adminForm.html"));
});

// page vue clients
app.get("/admin/clients", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adminClients.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
