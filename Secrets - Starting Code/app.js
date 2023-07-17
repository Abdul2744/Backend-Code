//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./Routes/routes').router;
const session = require("express-session");
const dotenv = require("dotenv");
const envFilePath = process.env.ENV_FILE_PATH;
dotenv.config(
    {
        path: envFilePath
    }
);
const port = process.env.APPLICATION_PORT || 5000;
const sessionSecretKey = process.env.SESSION_SECRET_KEY;
app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(routes);
app.use(express.static("public"));
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.listen(port, () => {
    console.log(`Application server is listining on ${port}`);
})

