const express = require('express');
const router = express.Router();
const verifyJWT = require('../JWT/jwt-verify')
const bodyParser = require('body-parser');
const helperMethods = require('../Functions/helper.methods');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.get("/", helperMethods.home);
router.get("/login", helperMethods.getLogin);
router.get("/register", helperMethods.getRegister);
router.post("/userLogin", helperMethods.login);
router.post("/register", helperMethods.register);
router.get("/submit", verifyJWT, helperMethods.submit);
router.get("/secrets", verifyJWT, helperMethods.getSecrets);

module.exports = { router };