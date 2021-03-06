const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.loginUser = async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the user data from the request body
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email }).populate('roles');

        if (!user) return res.status(400).json({ msg: 'El usuario no existe.' });
        

        // Check if the password is correct
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'La contraseña es incorrecta.' });
        
        // Create and sign (jwt)
        const payload = {
            user: {
                id: user.id,
                roles: user.roles
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
};

// Get the user authenticated
exports.getAuthUser = async (req, res) => {
    try {
        // Get the user from the request and populate the roles and exclude the password
        const user = await User.findById(req.user.id).populate('roles').select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json('Hubo un error');
    }
};