const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const createRoles = require('./libs/initialSetup');

// Create the server and connect to the database
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

// Enable CORS
app.use(cors());

// Create roles
createRoles();


// Enable express.json
app.use(express.json({ extended: true }));

// Import routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/tasks', require('./routes/tasks.routes'));


// Run server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})