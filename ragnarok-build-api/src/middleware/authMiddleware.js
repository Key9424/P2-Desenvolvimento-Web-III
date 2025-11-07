
const jwt = require('jsonwebtoken');
const User = require('../modelos/User.js');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Não autorizado, token inválido.' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Não autorizado, sem token.' });
    }
};

module.exports = { protect }
