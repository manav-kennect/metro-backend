const express = require('express');
const app = express();
const port = 33000; // You can choose any available port you prefer

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Hello, World! This is my simple Express server.</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});