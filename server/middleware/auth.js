const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: '../config/.env' })

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization failed.', type: 'fail' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid', type: 'fail' })
    }
}