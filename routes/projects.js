// Routes to admin projects
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middlewares/auth');
const projectsController = require('../controllers/projectController');

// Create a new project | api/projects
router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty()
    ],
    projectsController.createProject
);

// Get all projects | api/projects
router.get('/',
    auth,
    projectsController.getProjects
);

// Update a project | api/projects/:id
router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.updateProject
);

// Delete a project | api/projects/:id
router.delete('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    projectsController.deleteProject
);

module.exports = router;