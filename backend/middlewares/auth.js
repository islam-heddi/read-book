const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    

    //const token = authHeader.split(' ')[1];   
    console.log("verification : " + token);

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.id;
        console.log("id : "+ decoded.id)
        console.log("name : " + decoded.name)
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken