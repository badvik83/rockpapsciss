const express = require('express');
const pool = require('./db'); // This is the db connection pool
const bcrypt = require('bcrypt'); // To handle password encryption
const app = express();

app.use(express.json());

// To serve static files
app.use(express.static('public'));

// Define a route for the root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Path to your HTML file
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const result = await pool.query(userQuery, [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Compare password using bcrypt
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (isPasswordCorrect) {
                // Successful login
                res.json({ success: true });
            } else {
                // Wrong password
                res.json({ success: false, message: 'Invalid password' });
            }
        } else {
            // No user found
            res.json({ success: false, message: 'User not found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
