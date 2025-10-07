// routes/users.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* ----------------------------------------------------
   1️⃣ GET /api/v1/user/profile
   → Return user.json data
---------------------------------------------------- */
router.get('/profile', (req, res) => {
  fs.readFile(path.join(__dirname, '../user.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user file:', err);
      res.status(500).json({ error: 'File not found' });
    } else {
      res.type('json').send(data);
    }
  });
});

/* ----------------------------------------------------
   2️⃣ POST /api/v1/user/login
   → Validate username & password from user.json
---------------------------------------------------- */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, '../user.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user file:', err);
      res.status(500).json({ status: false, message: 'Server Error' });
      return;
    }

    const user = JSON.parse(data);

    if (username !== user.username) {
      res.json({ status: false, message: 'User Name is invalid' });
    } else if (password !== user.password) {
      res.json({ status: false, message: 'Password is invalid' });
    } else {
      res.json({ status: true, message: 'User Is valid' });
    }
  });
});

/* ----------------------------------------------------
   3️⃣ GET /api/v1/user/logout/:username
   → Return HTML message confirming logout
---------------------------------------------------- */
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = router;
