import axios from "axios";

const API_URL = "http://localhost:8000/api/task";

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
export const updateTask = async (id, updatedData) => {
  // console.log(id);
  const response = await axios.put(`${API_URL}/${id}`, updatedData, {
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
