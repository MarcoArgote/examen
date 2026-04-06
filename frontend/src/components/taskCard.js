const STATUS_LABELS = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Completada'
};

const STATUS_PERCENT = {
  pending: 25,
  in_progress: 60,
  completed: 100
};

export function taskProgress(status) {
  return STATUS_PERCENT[status] ?? 0;
}

export function renderTaskCard(task, actions = {}) {
  const card = document.createElement('article');
  card.className = `task-card status-${task.status}`;

  const progress = taskProgress(task.status);

  card.innerHTML = `
    <div class="progress-circle" style="--progress:${progress}%">
      <span>${progress}%</span>
    </div>
    <div class="task-info">
      <h3 class="task-title"></h3>
      <p class="task-description"></p>
      <span class="task-status">${STATUS_LABELS[task.status] || 'Sin estado'}</span>
    </div>
    <div class="task-actions">
      <button class="action-btn complete-btn" type="button">${task.status === 'completed' ? 'Reabrir' : 'Completar'}</button>
      <button class="action-btn delete-btn" type="button">Eliminar</button>
    </div>
  `;

  card.querySelector('.task-title').textContent = task.title;
  card.querySelector('.task-description').textContent = task.description || 'Sin descripcion';

  card.querySelector('.complete-btn').addEventListener('click', () => {
    if (actions.onToggleComplete) {
      actions.onToggleComplete(task);
    }
  });

  card.querySelector('.delete-btn').addEventListener('click', () => {
    if (actions.onDelete) {
      actions.onDelete(task);
    }
  });

  return card;
}
