const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    return res.json({ success: true, token: "mock-token" });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get("/api/projects", (req, res) => {
  const projects = [{ id: 1, name: "Project" }];
  return res.json(projects);
});

module.exports = app;
