const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

/**
 * GET /api/profile
 * header: Authorization: Bearer <token>
 */
app.get("/api/profile", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });

  const token = auth.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Token invalid or expired" });
    res.json({ message: "Welcome!", user });
  });
});

module.exports = app; // ✅ export thẳng Express app
