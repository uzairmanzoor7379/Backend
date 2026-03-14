
const jwt = require('jsonwebtoken');
const redis = require('../config/cache');


async function identifyUser(req ,res,next) {
    const token =  req.cookies.token
     if(!token){
        return res.status(404).json({
            message : "Token not found"
        })
     }

     const BlacklistToken = await redis.get(token)
     if(BlacklistToken){
        return res.status(401).json({
            message : "Invalid Token"
        })
     }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
       req.user = decoded
    next()
    } catch (error) {
        return res.status(401).json({
            message : "Invalid Token"
        })
    }

}

module.exports = identifyUser