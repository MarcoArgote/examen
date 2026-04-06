const API_URL = 'http://localhost:3000/api/tasks';


async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (response.status === 204) return null;
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  if (!response.ok) {
    throw new Error((data && data.message) || response.statusText || 'Error inesperado');
  }
  return data;
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
