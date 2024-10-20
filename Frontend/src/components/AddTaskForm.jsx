import { useState } from "react";
import { createTask } from "../services/task.service";
import PropTypes from "prop-types";
import "../styles/taskform.css";

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const taskData = {
        title,
        completed,
        priority,
        dueDate,
      };

      const response = await createTask(taskData);

      if (response.error) {
        setError(response.error);
      } else {
        onTaskAdded(response.task); // Callback to parent to update the task list
        resetForm();
      }
    } catch (err) {
      console.log(err);
      setError("Failed to create task. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setCompleted(false);
    setPriority("low");
    setDueDate("");
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="add-task-form">
      <h2>Add New Task</h2>
      <div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group">
              <input
                type="text"
                id="title"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Priority"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                placeholder="Due Date"
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default AddTaskForm;
