var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(
    {
        path: "./Config/config.env"
    }
);
var con = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(function (err) {
    if (err) console.log('my database error', err);
    console.log("Database Connected!");
});

module.exports = con;
