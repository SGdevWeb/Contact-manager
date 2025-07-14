const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const clientRoutes = require("./routes/clients");
const path = require("path");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("views"));

app.use("/api/clients", clientRoutes);

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
