const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Role = require('../models/Role');
const User = require('../models/User');


exports.createUser = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the user data from the request body
    const { email, password, roles } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe.' });
        }

        // Create the new user
        user = new User(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Check the roles
        if (roles) {
            const foundRoles = await Role.find({name: {$in: roles}});
            user.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' });
            user.roles = [role._id];
        }

        // Save and sign (jwt) the new user
        await user.save();

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
        res.status(400).send('Hubo un error');
    }
}