// Imports
const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

// Initiates express
const app = express();

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
        res.json({ id, secret: temp_secret })

    }
    
    catch(error) {}

});

// The port for the server
const PORT = process.env.PORT || 5000;

// Runs the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));