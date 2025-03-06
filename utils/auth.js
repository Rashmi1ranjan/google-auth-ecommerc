
const jwt = require('jsonwebtoken');

exports.generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
