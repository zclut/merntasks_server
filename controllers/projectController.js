const { validationResult } = require('express-validator');
const Project = require('../models/Project');


// Create a new project for the active user
exports.createProject = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create a new project
        const project = new Project(req.body);

        // Save the project with JWT
        project.user = req.user.id;
        await project.save();

        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};


// Get all projects for the active user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id }).sort({ created_at: -1 });
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};

// Update a project for the active user
exports.updateProject = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the project data from the request body
    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        // Check the ID
        let project = await Project.findById(req.params.id);

        // Check if the project exists
        if (!project) {
            return res.status(404).json({ msg: 'El proyecto no existe.' });
        }

        // Verify the user is the owner of the project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado.' });
        }

        // Update the project
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}

// Delete a project for the active user
exports.deleteProject = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check the ID
        let project = await Project.findById(req.params.id);

        // Check if the project exists
        if (!project) {
            return res.status(404).json({ msg: 'El proyecto no existe.' });
        }

        // Verify the user is the owner of the project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado.' });
        }

        // Delete the project
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}