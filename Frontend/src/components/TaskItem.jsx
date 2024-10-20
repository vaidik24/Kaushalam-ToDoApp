import { useState } from "react";
import PropTypes from "prop-types";
import {
  updateTask,
  deleteTask,
  markTaskAsComplete,
  markTaskAsIncomplete,
} from "../services/task.service";
import "../styles/taskitem.css";

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate.split("T")[0]); // Format date for input
  const [complete, setComplete] = useState(task.completed);

  const handleUpdate = async () => {
    const updatedData = { title, priority, dueDate };
    const updatedTask = await updateTask(task._id, updatedData);
    onTaskUpdated(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onTaskDeleted(task._id); // Callback to parent to remove the task from the list
  };

  const handleComplete = async () => {
    const completedTask = await markTaskAsComplete(task._id);
    setComplete((prevComplete) => !prevComplete);
    onTaskUpdated(completedTask); // Update the task state after marking as complete
  };

  const handleIncomplete = async () => {
    const IncompletedTask = await markTaskAsIncomplete(task._id);
    setComplete((prevComplete) => !prevComplete);
    onTaskUpdated(IncompletedTask); // Update the task state after marking as complete
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="task-item-editing">
          <input
            className="task-item-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            className="task-item-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            className="task-item-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="task-item-button" onClick={handleUpdate}>
            Save
          </button>
          <button
            className="task-item-button cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="task-item">
          <div className="item">
            <h2 className="task-item-title">{task.title}</h2>
            <p className="task-item-priority">Priority: {task.priority}</p>
            <p className="task-item-due-date">
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p className="task-item-status">
              Status: {complete ? "Completed" : "Incomplete"}
            </p>
            <button
              className="task-item-button"
              onClick={complete ? handleIncomplete : handleComplete}
            >
              {complete ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button
              className="task-item-button edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="task-item-button delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
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
