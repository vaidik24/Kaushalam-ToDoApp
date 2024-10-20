import axios from "axios";

const API_URL = "/api/task";

export const getAllTasks = async () => {
  const response = await axios.get(`${API_URL}/getall`, {
    withCredentials: true,
  });
  return response.data.tasks;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/create`, taskData, {
    withCredentials: true,
  });
  return response.data;
};

// Update task
export const updateTask = async (taskId, updatedData) => {
  const response = await axios.put(`${API_URL}/update/${taskId}`, updatedData, {
    withCredentials: true,
  });
  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/delete/${taskId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Mark task as complete
export const markTaskAsComplete = async (taskId) => {
  const response = await axios.patch(
    `${API_URL}/complete/${taskId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
