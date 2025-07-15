const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");

const clientRoutes = require("./routes/clients");
const adminRoutes = require("./routes/admin");
const { requireAdmin } = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("views"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false },
  })
);

app.use("/", adminRoutes);

app.use("/api/clients", requireAdmin, clientRoutes);

// Vues Html
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adminForm.html"));
});

app.get("/admin/clients", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "adminClients.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
