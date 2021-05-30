const jwt = require('jsonwebtoken');
require('dotenv').config()

function auth(res, res, next) {
    const token = req.header('x-auth-token');
    // check for token
    if(!token) res.status(401).json({msg: 'No token, authorization denied'});
    
    try {
        // verify token
        const decoded = jwt.verify(token, process.env.jwt_secret);
        // add patient from payload
        req.patient = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid'});
    }
}

module.exports = auth;