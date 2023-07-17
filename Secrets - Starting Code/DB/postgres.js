const dotenv = require('dotenv');
dotenv.config(
    {
        path: "./Config/config.env"
    }
);

const { Client } = require('pg')
const pgClient = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})
pgClient.connect(function (err) {
    if (err) throw err;
    console.log("postgres Connected!");
});
module.exports = pgClient;