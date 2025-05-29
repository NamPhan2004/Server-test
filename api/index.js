const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

const allowedOrigins = [
  "https://fir-f51a2.web.app", // domain frontend của bạn trên Firebase Hosting
  //   "http://localhost:3000",                  // nếu test local
  "https://server-test-2mb5.vercel.app", // chính domain API (option, không bắt buộc)
];

// Cấu hình CORS để chỉ cho phép các domain hợp lệ
app.use(
  cors({
    origin: function (origin, callback) {
      // Nếu không có origin (postman, curl, server side), hoặc domain nằm trong danh sách allowedOrigins thì cho phép
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

const SECRET_KEY = "your-secret-key";

/* Đăng nhập */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "123") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "30s" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Login failed" });
});

/* Route bảo vệ */
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Token expired or invalid" });
    return res.json({ message: "Welcome!", user });
  });
});

/* Xuất hàm serverless */
module.exports = serverless(app);
