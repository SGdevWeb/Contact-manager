const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.get("/logout", adminController.logout);
router.get("/check-session", adminController.checkSession);

module.exports = router;
