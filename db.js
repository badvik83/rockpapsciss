const {Pool} = require('pg');

//A pool to manage multiple connections

const pool = new Pool({
    user: 'game_user',
    host: 'localhost',
    database: 'rps_db',
    password: '1Xplorer',
    port: 5432,
});

module.exports = pool;