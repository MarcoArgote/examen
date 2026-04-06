const { TaskService } = require('../services/taskService');

class TaskController {
  constructor(taskService = new TaskService()) {
    this.taskService = taskService;
  }

  getTasks = async (_req, res) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createTask = async (req, res) => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateTask = async (req, res) => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body);

      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  deleteTask = async (req, res) => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = { TaskController };
