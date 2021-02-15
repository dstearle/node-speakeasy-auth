// Imports
const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

// Initiates express
const app = express();

// Database
const db = new JsonDB(new Config('myDatabase', true, false, '/'))

// Routes
app.get('/api', (req, res) => res.json({ message: 'Welcome to the two factor authentication example' }))

// The port for the server
const PORT = process.env.PORT || 5000;

// Runs the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));