const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

/**
 * GET /api/profile
 * header: Authorization: Bearer <token>
 */
app.get("/", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Token invalid or expired" });
    return res.json({ message: "Welcome!", user });
  });
});

module.exports = serverless(app);
