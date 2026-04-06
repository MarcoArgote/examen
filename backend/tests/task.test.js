const { TaskService } = require('../src/services/taskService');

describe('TaskService', () => {
  test('no se puede crear una tarea con titulo vacio', async () => {
    const fakeRepo = {
      create: jest.fn()
    };

    const service = new TaskService(fakeRepo);

    await expect(
      service.createTask({ title: '   ', description: 'Sin titulo real' })
    ).rejects.toThrow('El titulo es obligatorio');

    expect(fakeRepo.create).not.toHaveBeenCalled();
  });

  test('una tarea nueva usa estado pending por defecto', async () => {
    const fakeRepo = {
      create: jest.fn(async (task) => ({ ...task, id: 'abc-1' }))
    };

    const service = new TaskService(fakeRepo);
    const task = await service.createTask({ title: 'Tarea nueva' });

    expect(task.status).toBe('pending');
    expect(fakeRepo.create).toHaveBeenCalledTimes(1);
  });

  test('se puede marcar una tarea como completada', async () => {
    const fakeRepo = {
      update: jest.fn(async (_id, updates) => ({ id: '1', ...updates }))
    };

    const service = new TaskService(fakeRepo);
    const updated = await service.markAsCompleted('1');

    expect(fakeRepo.update).toHaveBeenCalledWith('1', { status: 'completed' });
    expect(updated.status).toBe('completed');
  });

  test('retorna lista de tareas correctamente', async () => {
    const fakeTasks = [
      { id: '1', title: 'A', status: 'pending' },
      { id: '2', title: 'B', status: 'completed' }
    ];

    const fakeRepo = {
      findAll: jest.fn(async () => fakeTasks)
    };

    const service = new TaskService(fakeRepo);
    const tasks = await service.getAllTasks();

    expect(tasks).toHaveLength(2);
    expect(tasks[1].status).toBe('completed');
  });
});
