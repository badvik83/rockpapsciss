// app.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { pool, getUser } = require('./db'); // Importing pool and getUser from db.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Define a route for the root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Path to your HTML file
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Retrieve user from DB using the getUser function
        const user = await getUser(username);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Simple string comparison for passwords
        if (password === user.password_hash) {
            return res.status(200).json({ success: true, message: "Login successful", user });
        } else {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Example route to get data from the database
app.get('/some-endpoint', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM your_table');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});