const express = require('express');
const connectDB = require('./config/db');

// Create the server and connect to the database
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Enable express.json
app.use(express.json({ extended: true }));

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


// Run server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})