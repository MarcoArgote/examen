const { Task } = require('../models/taskModel');
const { TaskRepository } = require('../repositories/taskRepository');

const ALLOWED_STATUS = ['pending', 'in_progress', 'completed'];

class TaskService {
  constructor(taskRepository = new TaskRepository()) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks() {
    return await this._fetchAllTasks();
  }

  async _fetchAllTasks() {
    // Aquí se puede agregar lógica adicional si se requiere en el futuro
    return this.taskRepository.findAll();
  }

  async createTask(payload) {
    const title = (payload.title || '').trim();
    const description = (payload.description || '').trim();
    const status = payload.status || 'pending';

    if (!title) {
      throw new Error('El titulo es obligatorio');
    }

    if (!ALLOWED_STATUS.includes(status)) {
      throw new Error('Estado invalido');
    }

    const task = new Task({ title, description, status });
    return this.taskRepository.create(task);
  }

  async updateTask(id, payload) {
    const updates = {};

    if (typeof payload.title !== 'undefined') {
      const cleanTitle = payload.title.trim();
      if (!cleanTitle) {
        throw new Error('El titulo no puede estar vacio');
      }
      updates.title = cleanTitle;
    }

    if (typeof payload.description !== 'undefined') {
      updates.description = payload.description.trim();
    }

    if (typeof payload.status !== 'undefined') {
      if (!ALLOWED_STATUS.includes(payload.status)) {
        throw new Error('Estado invalido');
      }
      updates.status = payload.status;
    }

    return this.taskRepository.update(id, updates);
  }

  async markAsCompleted(id) {
    return this.taskRepository.update(id, { status: 'completed' });
  }

  async deleteTask(id) {
    return this.taskRepository.remove(id);
  }
}

module.exports = { TaskService, ALLOWED_STATUS };
