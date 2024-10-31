const {Pool} = require('pg');

//A pool to manage multiple connections

const pool = new Pool({
    user: 'game_user',
    host: 'localhost',
    database: 'rps_db',
    password: '1Xplorer',
    port: 5432,
});

// Function to retrieve a user by their username
async function getUser(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    try {
        const res = await pool.query(query, [username]);
        return res.rows[0]; // Returning the user if found
    } catch (err) {
        console.error('Error fetching user', err);
        throw err;
    }
}


// Exporting functions for use in app.js
module.exports = { pool, getUser };