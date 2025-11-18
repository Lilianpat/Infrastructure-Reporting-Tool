exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// backend/middleware/adminMiddleware.js
module.exports = function isAdmin(req, res, next) {
  try {
    // authMiddleware must have already run and set req.user
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  } catch (err) {
    console.error("ADMIN MIDDLEWARE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
