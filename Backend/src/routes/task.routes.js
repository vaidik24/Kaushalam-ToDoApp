import { Router } from "express";
import {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
  markAsComplete,
  markAsIncomplete,
  createTasks,
} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const taskRouter = Router();

taskRouter.post("/create", verifyJWT, createTask);

taskRouter.post("/bulk-create", verifyJWT, createTasks);

taskRouter.get("/getall", verifyJWT, getAllTasks);

taskRouter.put("/:id", verifyJWT, updateTask);

taskRouter.delete("/:id", verifyJWT, deleteTask);

taskRouter.patch("/:id/complete", verifyJWT, markAsComplete);

taskRouter.patch("/:id/incomplete", verifyJWT, markAsIncomplete);

export default taskRouter;
