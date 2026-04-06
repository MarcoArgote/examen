const API_URL = 'http://localhost:3001/api/tasks';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    let detail = 'Error inesperado';
    try {
      const body = await response.json();
      detail = body.message || detail;
    } catch (_err) {
      detail = response.statusText || detail;
    }
    throw new Error(detail);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getTasks() {
  return request(API_URL);
}

export function createTask(payload) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function updateTask(id, payload) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export function updateTaskStatus(id, status) {
  return updateTask(id, { status });
}

export function deleteTask(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
