
const con = require('../DB/mysql');
const jwthelper = require('../util/jwthelper');
const bcrypt = require('bcrypt');
const login = (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let sql = `select password from userdata where email='${email}' `;
        con.query(sql, function (err, results) {
            if (results.length > 0) {
                let compPass = results[0].password;
                let ans = bcrypt.compare(password, compPass);
                ans.then(
                    data => {
                        if (data) {
                            var jwtToken = jwthelper.encryptData({ email, password });
                            res.json(
                                {
                                    "token": jwtToken
                                }
                            )
                        }
                        else res.send(`<h1> pls enter correct email or password </h1> `)
                    }
                );

            }
            else {
                res.send(`<h1> Signup is required </h1> `);
            }

        })


    }
    else {
        res.send(`<h1> Please enter email or password </h1>`)
    }
};

const register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send('<h1> please provide valid email or password! </h1>')
    }
    else {
        var sql = `select * from userdata where email='${email}' `;
        con.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.send(`<h1> user already exists </h1>`)
            }
            else {
                var hashedPassword = bcrypt.hashSync(password, 5);
                var insertQuery = `insert into userdata (email,password) value ('${email}','${hashedPassword}')`;
                con.query(insertQuery, (err, results) => {
                    if (err) throw err;
                    if (results) {

                        res.redirect('/login')
                        //  res.send('<h1> User Register Successfully! </h1>')
                    }
                })
            }
        })


    }

}

const submit = (req, res) => {
    const token = req.token;
    const jwt = jwthelper.jwt;
    const secretKey = jwthelper.secretKey;
    jwt.verify(token, secretKey, (err, authData) => {
        if (err) {
            res.status(403).json({ message: "Invalid token." });
        }
        else {
            res.json(
                {
                    "message": "profile accessed",
                    "data": authData
                }
            )
        }
    })


}

const home = (req, res) => {
    res.render("home.ejs")
}

const getLogin = (req, res) => {
    res.render("login.ejs")
}
const getRegister = (req, res) => {
    res.render("register.ejs")
}

const getSecrets = (req, res) => {
    res.render("secrets.ejs")
}

module.exports = { login, register, submit, home, getLogin, getRegister, getSecrets }