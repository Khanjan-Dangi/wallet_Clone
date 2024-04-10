const { JWT_SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,JWT_SECRET_KEY);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(403).json({});
    }

}

module.exports = authMiddleware;