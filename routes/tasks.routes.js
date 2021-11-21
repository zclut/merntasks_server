// Routes to admin projects
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth');
const taskController = require('../controllers/task.controller');

// Create a new task | api/tasks
router.post('/',
    verifyToken,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
);

// Get all tasks in project | api/tasks/:project
router.get('/:projectId',
    verifyToken,
    taskController.getTasks
);

// Update a task | api/tasks/:id
router.put('/:id',
    verifyToken,
    taskController.updateTask
);

// Delete a task | api/tasks/:id
router.delete('/:id',
    verifyToken,
    taskController.deleteTask
);

module.exports = router;