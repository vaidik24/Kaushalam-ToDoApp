import { Task } from "./task.model.js";

const createTask = async (req, res) => {
  try {
    const { title, completed, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Task title is required" });
    }

    const newTask = new Task({
      title,
      completed,
      priority,
      dueDate,
    });

    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating task", details: error.message });
  }
};

const createTasks = async (req, res) => {
  try {
    const tasks = req.body;

    if (!Array.isArray(tasks) || !tasks.length) {
      return res
        .status(400)
        .json({ error: "At least one task is required in an array format" });
    }

    for (let task of tasks) {
      if (!task.title) {
        return res.status(400).json({ error: "Each task must have a title" });
      }

      if (task.completed !== undefined && typeof task.completed !== "boolean") {
        return res
          .status(400)
          .json({
            error: `Task "${task.title}" has an invalid 'completed' field. It must be a boolean`,
          });
      }

      if (task.priority && !["low", "medium", "high"].includes(task.priority)) {
        return res
          .status(400)
          .json({
            error: `Task "${task.title}" has an invalid 'priority'. It must be 'low', 'medium', or 'high'`,
          });
      }

      if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
        return res
          .status(400)
          .json({
            error: `Task "${task.title}" has an invalid 'dueDate'. It must be a valid date`,
          });
      }
    }

    const createdTasks = await Task.insertMany(tasks);

    res
      .status(201)
      .json({ message: "Tasks created successfully", tasks: createdTasks });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating tasks", details: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed = false, priority, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed, priority, dueDate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating task", details: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching tasks", details: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting task", details: error.message });
  }
};

const markAsComplete = async (req, res) => {
  try {
    const { id } = req.params;

    const completedTask = await Task.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!completedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task marked as complete", task: completedTask });
  } catch (error) {
    res.status(500).json({
      error: "Error marking task as complete",
      details: error.message,
    });
  }
};

const markAsIncomplete = async (req, res) => {
  try {
    const { id } = req.params;

    const incompleteTask = await Task.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );

    if (!incompleteTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task marked as incomplete", task: incompleteTask });
  } catch (error) {
    res.status(500).json({
      error: "Error marking task as incomplete",
      details: error.message,
    });
  }
};

export {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
  markAsComplete,
  markAsIncomplete,
  createTasks,
};
