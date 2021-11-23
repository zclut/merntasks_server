const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');

// Create a new task
exports.createTask = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extract the project and check if it exists
        const { project } = req.body;

        const projectExists = await Project.findById(project);
        if (!projectExists) return res.status(404).json({ msg: 'Proyecto no encontrado' });

        // Check if current project belongs to authenticated user
        if (projectExists.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado.' });

        // Create the task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
};

// Get all tasks in a project
exports.getTasks = async (req, res) => {

    try {
        // Extract the project and check if it exists
        const { project } = req.query;

        const projectExists = await Project.findById(project);
        if (!projectExists) return res.status(404).json({ msg: 'Proyecto no encontrado' });

        // Check if current project belongs to authenticated user
        if (projectExists.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado.' });

        // Get all tasks if exists in the projectExists
        const tasks = await Task.find({ project }).sort({ date: -1 });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
};

// Update a task
exports.updateTask = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Extract the project, name, status and check if it exists
        const { project, name, status } = req.body;

        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });

        // Check if current project belongs to authenticated user
        const projectExists = await Project.findById(project);
        if (projectExists.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado.' });

        // Create the task with the new data
        const newTask = {};
        if (name) newTask.name = name;
        if (status || !status) newTask.status = status;

        // Update the task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ task });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {

    try {
        // Extract the project, name, status and check if it exists
        const { project } = req.body;

        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' });

        // Check if current project belongs to authenticated user
        const projectExists = await Project.findById(project);
        if (projectExists.user.toString() !== req.user.id) return res.status(401).json({ msg: 'No autorizado.' });

        // Delete the task
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
};