// Imports
const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

// Initiates express
const app = express();

// Middleware
app.use(express.json());

// Database
const db = new JsonDB(new Config('myDatabase', true, false, '/'));

// Routes
app.get('/api', (req, res) => res.json({ message: 'Welcome to the two factor authentication example' }));

// Register user and create temporary secret
app.post('/api/register', (req, res) => {

    // Generates a new ID
    const id = uuid.v4()

    // If no errors occur create a new user and push to the db
    try {

        // The new user ID
        const path =`/user/${id}`

        // The temporary secret for the new user
        const temp_secret = speakeasy.generateSecret()

        // Pushes the user ID and temporary secret to the database
        db.push(path, { id, temp_secret })

        // The response from the server with the new user info
        res.json({ id, secret: temp_secret.base32 })

    }
    
    // If an error occurs inform the terminal and display 500 status
    catch(error) {

        console.log(error);

        res.status(500).json({ message: 'Error generating the secret' });

    }

});

// Verify token and make secret permanent
app.post('/api/verify', (req, res) => {

    const {token, userId} = req.body;

    // If no errors then retrieve the user data
    try {

        // The path to the user's ID
        const path = `/user/${id}`;

        // The user in the database
        const user = db.getData(path);

    }

});

// The port for the server
const PORT = process.env.PORT || 5000;

// Runs the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));