const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    // Check for the token
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token) return res.status(401).json([{message: 'No token, authorization denied', type: 'error'}]);

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json([{message: 'Token is not valid', type: 'error'}]);
    }
}