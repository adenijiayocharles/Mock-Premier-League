const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "usersecret");
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed.'
        })
    }    
}