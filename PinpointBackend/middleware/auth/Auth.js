const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['Authorization'];
    console.log(token)
    if (!token)
        return res.status(401)
            .send('Access is denied. No token provided.');

    try {
        let secret = process.env.TOKEN_SECRET
        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};