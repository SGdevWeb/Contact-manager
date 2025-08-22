const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");

const clientRoutes = require("./routes/clients");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const { requireAdmin } = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("views"));

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Configuration du store MySQL
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 min
  expiration: 86400000, // 1 jours
});

// Middleware express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400000,
    },
  })
);

// Routes API
app.use("/api/admin", adminRoutes);
app.use("/api/clients", requireAdmin, clientRoutes);
app.use("/api/contact", contactRoutes);

// Routes HTML
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
