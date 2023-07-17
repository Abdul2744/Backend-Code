
const dotenv = require('dotenv');
dotenv.config(
    {
        path: "./Config/config.env"
    }
);
const knex = require('knex')(
    {
        client: 'pg',
        connection: {
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            database: process.env.PG_DB,
            password: process.env.PG_PASSWORD,
        }
    }
);
// knex.schema.createTable("paypal1234", (table) => {
//   table.increments("id")
//   table.string("payment")
//   table.string("process")
// })
//   .then(() => {
//     return knex("paypal1234").insert(
//       [
//         { payment: "first sec", process: "successfully" },
//         { payment: "second", process: "failed" }
//       ]
//     )
//   }
//   )
module.exports = { knex }
