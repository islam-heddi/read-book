const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
//    const token = req.headers['authorization'];
    const token = req.cookies.token
    

    //const token = authHeader.split(' ')[1];   
    console.log("verification : " + token);

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.id;
        req.userName = decoded.name;
        req.userEmail = decoded.email;
        req.userDate = decoded.date;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken