// auth.js
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'access-token'; 
const REFRESH_TOKEN_SECRET = 'refresh-token';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';


function generateTokens(user) {
  const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return { accessToken, refreshToken };
}


function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}


function refreshToken(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    res.json({ accessToken: newToken });
  });
}

module.exports = {
  generateTokens,
  checkToken,
  refreshToken,
};
