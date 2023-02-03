import { Router } from "express";
import { auth } from "../../middlewares";
import TaskController from "./controller";
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  sortTasks,
} from "./validator";
const router = Router();

router.post("/", auth, createTask, TaskController.createTask);
router.patch("/", auth, editTask, TaskController.editTask);
router.get("/", auth, getTask, TaskController.getTasks);
router.delete("/:_id", auth, deleteTask, TaskController.deleteTask);
router.put("/sort", auth, sortTasks, TaskController.sortTasks);
export default router;
