import { Request, Response } from "express";
import { handleCatchError, handleSuccess } from "../../middlewares";
import TaskServices from "./services";

class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const { task, date } = req.body;
      const { _id: user_id } = req.user;
      const result = await TaskServices.createtask(user_id, task, date);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async editTask(req: Request, res: Response) {
    try {
      const { task_id, task, date, status } = req.body;
      const { _id: user_id } = req.user;

      const result = await TaskServices.editTask(
        user_id,
        task_id,
        task,
        date,
        status
      );
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async deleteTask(req: Request, res: Response) {
    try {
      let { _id: task_id } = req.params;
      const { _id: user_id } = req.user;
      const result = await TaskServices.deletetask(task_id, user_id);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async getTasks(req: Request, res: Response) {
    try {
      const { _id: user_id } = req.user;
      var { page, limit } = req.query;

      const result = await TaskServices.getTasks(user_id, page, limit);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async sortTasks(req: Request, res: Response) {
    try {
      const { _id: user_id } = req.user;
      var { task_sequence } = req.body;

      const result = await TaskServices.sortTasks(user_id, task_sequence);
      console.log("result", result);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
}

export default TaskController;
