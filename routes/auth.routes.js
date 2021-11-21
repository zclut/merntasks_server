// Routes to auth users
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Create a new user | api/auth
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
    ],
    authController.loginUser
);
    

module.exports = router;