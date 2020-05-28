const jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(req,res,next){
    try{
        const token =  req.header('x-auth-token');
        if(!token) return res.status(401).send('Not Authenticated');
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user=decoded;
        next();
    }
    catch(ex){
        return res.status(400).send('Invalid Authentication Token');
    }
};