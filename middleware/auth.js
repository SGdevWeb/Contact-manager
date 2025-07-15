const requireAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Accès interdit" });
  }
  next();
};

module.exports = { requireAdmin };
