import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import "../styles/tasklist.css";

const priorityOrder = {
  low: 3, // Lowest priority value
  medium: 2, // Medium priority value
  high: 1, // Highest priority value
};

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const sortedTasks = tasks.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff; // Sort by priority
    }
    return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
  });
  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
  onTaskDeleted: PropTypes.func.isRequired,
};

export default TaskList;
