const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    console.log("verification : " + token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = await jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

}

module.exports = verifyToken