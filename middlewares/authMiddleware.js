// const jwt = require('jsonwebtoken');

// // middleware to verify token before accessing protected routes
// const authMeddileware = async(req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token , process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };

// module.exports = authMeddileware;

const jwt = require('jsonwebtoken');

// Middleware to verify token before accessing protected routes
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access Denied. No Token Provided' });
        }

        const actualToken = token.split(' ')[1];
        const verified = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = authMiddleware;
