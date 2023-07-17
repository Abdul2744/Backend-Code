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

module.exports = verifyJWT;