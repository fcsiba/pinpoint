const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const {
    createJWT,
} = require("../utils/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


exports.register = (req, res, next) => {
    let {name, email, password, password_confirmation} = req.body;

    let errors = [];
    if (!name) {
        errors.push({name: "required"});
    }
    if (!email) {
        errors.push({email: "required"});
    }
    if (!emailRegexp.test(email)) {
        errors.push({email: "Invalid email entered"});
    }
    if (!password) {
        errors.push({password: "required"});
    }
    if (!password_confirmation) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password !== password_confirmation) {
        errors.push({password: "Passwords mismatch"});
    }
    if (errors.length > 0) {
        return res.status(422).json({errors: errors});
    }
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(422).json(
                    {
                        errors: [
                            {
                                user: "User with this email already exists"
                            }
                        ]
                    }
                );
            } else {
                let user = new User({
                    name: name,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err)
                            throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{error: err}]
                                });
                            });
                    });
                });
            }
        }).catch((err) => {
        console.log(err)
        res.status(500).json({
            errors: [{error: 'Something went wrong'}]
        });
    })
}


exports.login = (req, res) => {
    let {email, password} = req.body;

    let errors = [];
    if (!email)
        errors.push({email: "Email field is required"});

    if (!emailRegexp.test(email))
        errors.push({email: "Invalid Email"});

    if (!password)
        errors.push({password: "Password field is required"});

    if (errors.length > 0)
        return res.status(422).json({errors: errors});

    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    errors: [{user: "User not found"}],
                });
            } else {
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({
                            errors: [{
                                password:
                                    "Incorrect password entered"
                            }]
                        });
                    }
                    let access_token = createJWT(
                        user.email,
                        user._id,
                        4800
                    );
                    let secret = process.env.TOKEN_SECRET
                    jwt.verify(access_token, secret, (err, decoded) => {
                        if (err)
                            res.status(500).json({errors: err});

                        if (decoded) {
                            return res.status(200).json({
                                success: true,
                                token: access_token,
                                message: user
                            });
                        }
                    });
                }).catch(err => {
                    res.status(500).json({errors: err});
                });
            }
        }).catch(err => {
            res.status(500).json({errors: err});
        }
    );
}