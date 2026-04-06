const express = require('express');
const { TaskController } = require('../controllers/taskController');

const taskRoutes = express.Router();
const taskController = new TaskController();

taskRoutes.get('/', taskController.getTasks);
taskRoutes.post('/', taskController.createTask);
taskRoutes.put('/:id', taskController.updateTask);
taskRoutes.delete('/:id', taskController.deleteTask);

module.exports = { taskRoutes };
