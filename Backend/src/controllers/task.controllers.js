import { Task } from "../models/task.models.js";

const createTask = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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

    user.tasks.push(newTask._id);
    await user.save();

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
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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
        return res.status(400).json({
          error: `Task "${task.title}" has an invalid 'completed' field. It must be a boolean`,
        });
      }

      if (task.priority && !["low", "medium", "high"].includes(task.priority)) {
        return res.status(400).json({
          error: `Task "${task.title}" has an invalid 'priority'. It must be 'low', 'medium', or 'high'`,
        });
      }

      if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
        return res.status(400).json({
          error: `Task "${task.title}" has an invalid 'dueDate'. It must be a valid date`,
        });
      }
    }

    const createdTasks = await Task.insertMany(tasks);

    createdTasks.forEach((task) => user.tasks.push(task._id));

    await user.save();

    res.status(201).json({
      message: "Tasks created successfully",
      tasks: createdTasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating tasks", details: error.message });
  }
};

const updateTask = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { id } = req.params;
    const { title, completed, priority, dueDate } = req.body;

    if (!user.tasks.includes(id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this task" });
    }

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
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    if (!user.tasks || !user.tasks.length) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    const tasks = await Task.find({ _id: { $in: user.tasks } });
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting tasks", details: error.message });
  }
};

const deleteTask = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    user.tasks = user.tasks.filter((taskId) => taskId.toString() !== id);
    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting task", details: error.message });
  }
};

const markAsComplete = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { id } = req.params;

    if (!user.tasks.includes(id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to mark this task as complete" });
    }

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
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { id } = req.params;

    if (!user.tasks.includes(id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to mark this task as incomplete" });
    }
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
