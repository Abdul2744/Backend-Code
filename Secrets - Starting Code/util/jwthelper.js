const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config(
    {
        path: "./Config/config.env"
    }
);
const secretKey = process.env.SECRET_KEY;
const encryptData = (data) => {
    const options = {
        algorithm: 'HS256',
        expiresIn: 1800
    }
    return jwt.sign(data, secretKey, options);
}

function verifyJWT(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader === undefined) {
        res.send(
            {
                "message": "invalid token"
            }
        )
    }
    else {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
}

module.exports = {
    encryptData, jwt, secretKey, verifyJWT
}
