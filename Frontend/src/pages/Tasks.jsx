import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm"; // Import the AddTaskForm
import { getAllTasks } from "../services/task.service";
import "../styles/task.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserAuth = () => {
      // Replace this with your actual login check logic
      const accessToken = localStorage.getItem("accessToken"); // Example of checking for a user in localStorage
      setIsLoggedIn(!!accessToken);
    };

    checkUserAuth();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (isLoggedIn) {
        const taskData = await getAllTasks();
        setTasks(taskData);
      }
    };
    fetchTasks();
  }, [isLoggedIn]);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="tasks-page">
      <h1>Your Tasks</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      {tasks.length > 0 ? ( // Change to check for length instead of using != []
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      ) : (
        <p className="no-tasks-message">
          No tasks available. Please add some tasks.
        </p> // Message when no tasks are present
      )}
    </div>
  );
};

export default Tasks;
