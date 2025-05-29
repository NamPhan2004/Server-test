const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

/**
 * POST /api/login
 * body: { "username": "user", "password": "123" }
 */
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "123") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30s" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Login failed" });
});

module.exports = app; // ✅ export thẳng Express app
