const express = require('express');
const path = require('path');          
const userRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware to parse JSON body
app.use(express.json());

//Add User Router with leading slash
app.use('/api/v1/user', userRouter);

/*
---------------------------------------------------------
  home.html
---------------------------------------------------------
*/
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
});

/*
---------------------------------------------------------
  Error handling middleware
---------------------------------------------------------
*/
app.use((err, req, res, next) => {
  console.error('Error caught by middleware:', err.stack);
  res.status(500).send('Server Error');
});

/*
---------------------------------------------------------
  Test route to trigger the 500 error
---------------------------------------------------------
*/
app.get('/test-error', (req, res, next) => {
  try {
    throw new Error('Simulated failure!');
  } catch (err) {
    next(err); // Passes error to your middleware below
  }
});

/*
---------------------------------------------------------
   Start the web server
---------------------------------------------------------
*/
app.listen(PORT, () => {
  console.log(`✅ Web Server is listening at http://localhost:${PORT}`);
});
