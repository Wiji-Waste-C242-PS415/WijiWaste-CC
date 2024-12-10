const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyToken: (request, h) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return h.response({ error: "Unauthorized access. No token provided." }).code(401).takeover();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // Tambahkan data pengguna dari token
      return h.continue;
    } catch (err) {
      console.error("Token verification failed:", err);
      return h.response({ error: "Invalid or expired token." }).code(403).takeover();
    }
  },
};

module.exports = authMiddleware;
