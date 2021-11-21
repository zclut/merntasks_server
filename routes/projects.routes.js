// Routes to admin projects
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {verifyToken} = require('../middlewares/auth');
const projectsController = require('../controllers/project.controller');

// Create a new project | api/projects
router.post('/',
    verifyToken,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty()
    ],
    projectsController.createProject
);

// Get all projects | api/projects
router.get('/',
    verifyToken,
    projectsController.getProjects
);

// Update a project | api/projects/:id
router.put('/:id',
    verifyToken,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.updateProject
);

// Delete a project | api/projects/:id
router.delete('/:id',
    verifyToken,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.deleteProject
);

module.exports = router;