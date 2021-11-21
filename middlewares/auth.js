const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Read the token from the header
    const token = req.header('x-auth-token');

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido.' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido.' });
    }
};