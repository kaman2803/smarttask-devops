import axios from 'axios';

// URL dynamique basée sur l'IP/domaine depuis lequel le navigateur charge la page
const API_URL = `http://${window.location.hostname}:5000/api/tasks`;

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getTaskStats = async () => {
  const tasks = await getTasks();
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'À faire' || t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'En cours' || t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'Terminée' || t.status === 'done').length,
  };
};
