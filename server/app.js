const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database/db');
const { generateTokens, refreshToken } = require('./auth/tokens');


const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/login', async(req, res) => {
  const { username, password } = req.body;

  const user = await db('users').where({ username }).first();

  if (!user) {
    console.log('User not found');
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (!password) {
    console.log('Invalid password');
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const tokens = generateTokens(user);
  console.log('Successful login');
  console.log(user, password, tokens);
  return res.json({ success: true, ...tokens });
});


app.post('/api/refresh', refreshToken);


app.get('/api/projects', async (req, res) => {
  const projects = await db('projects').select('*');
  res.json(projects);
});


module.exports = app;
