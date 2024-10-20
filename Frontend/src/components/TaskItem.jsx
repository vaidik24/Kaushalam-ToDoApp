import { useState } from "react";
import PropTypes from "prop-types";
import {
  updateTask,
  deleteTask,
  markTaskAsComplete,
} from "../services/task.service"; // Adjust import

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate.split("T")[0]); // Format date for input

  const handleUpdate = async () => {
    const updatedData = { title, priority, dueDate };
    const updatedTask = await updateTask(task._id, updatedData);
    onTaskUpdated(updatedTask); // Callback to parent to update the task list
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onTaskDeleted(task._id); // Callback to parent to remove the task from the list
  };

  const handleComplete = async () => {
    const completedTask = await markTaskAsComplete(task._id);
    onTaskUpdated(completedTask); // Update the task state after marking as complete
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
          <button onClick={handleComplete} disabled={task.completed}>
            Mark as Complete
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
};

export default TaskItem;
