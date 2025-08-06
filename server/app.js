const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const { authToken } = require('./auth/authMiddleware');
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


app.post('/api/signup', async (req, res) => {
  const { username, password, repPassword, firstName, lastName, age } = req.body;
  const errors = {};

  console.log('Received:', req.body);

  if (!username || username.length < 3) {
    errors.username = 'Username must contain 3 symbols or more';
  }

  if (!password || password.length < 4) {
    errors.password = 'Password must contain 4 symbols or more';
  } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    errors.password = 'Password must contain at least 1 letter and 1 number';
  }

  if (password !== repPassword) {
    errors.repPassword = 'Passwords do not match';
  }

  if (!firstName || firstName.length < 3) {
    errors.firstName = 'First name must contain 3 symbols or more';
  }

  if (!lastName || lastName.length < 3) {
    errors.lastName = 'Last name must contain 3 symbols or more';
  }

  if (!age || isNaN(age) || Number(age) <= 0) {
    errors.age = 'Age must be a number and can’t be zero';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const existing = await db('users').where({ username }).first();
  if (existing) {
    return res.status(400).json({ success: false, errors: { username: 'Username already taken' } });
  }

  const [userId] = await db('users').insert({
    username,
    password,
    first_name: firstName,
    last_name: lastName,
    age,
  });

  const newUser = { id: userId, username };
  const tokens = generateTokens(newUser);

  return res.json({ success: true, ...tokens });
});


module.exports = app;
