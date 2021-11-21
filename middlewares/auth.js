const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

module.exports.verifyToken = async function (req, res, next) {
    // Read the token from the header
    const token = req.header('x-auth-token');

    // Check if the token exists
    if (!token) return res.status(401).json({ msg: 'No hay token, permiso no válido.' });

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;

        const user = await User.findById(req.user.id, { password: 0 });
        if (!user) return res.status(401).json({ msg: 'El usuario no existe.' });

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido.' });
    }
};

module.exports.isModerator = async function (req, res, next) {
    /*const user = await User.findById(req.user.id, { password: 0 });
    const roles = await Role.find({_id: {$in: user.roles}});*/
    const roles = req.user.roles;

    roles.forEach(role => {
        if (role.name === 'moderador') {
            next();
            return;
        }
    });

    return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción.' });
};

module.exports.isAdmin = async function (req, res, next) {
    /*const user = await User.findById(req.user.id, { password: 0 });
    const roles = await Role.find({_id: {$in: user.roles}});*/
    const roles = req.user.roles;

    roles.forEach(role => {
        if (role.name === 'admin') {
            next();
            return;
        }
    });

    return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción.' })
};