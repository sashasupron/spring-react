const express = require('express');
const cors = require('cors');
const { features } = require('./data/features');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    console.log('Successful login');
    return res.json({ success: true, token: 'mock-token' });
  }
  console.log('Unsuccessful login');
  return res
    .status(401)
    .json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/projects', async (req, res) => {
  const projects = await db('projects').select('*');
  res.json(projects);
});

module.exports = app;
