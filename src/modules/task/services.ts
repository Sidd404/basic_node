import * as Models from "../../models";
import DAO from "../../DAO";
import mongoose from "mongoose";
import { Common } from "../../middlewares/index";
class TaskServices {
  static async createtask(user_id: string, task: string, date: Date) {
    try {
      let data = {
        user_id: user_id,
        task: task,
        date: date,
      };
      let result = await DAO.saveDocument(Models.Task, data);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async editTask(
    user_id: string,
    task_id: string,
    task: string,
    date: Date,
    status: string
  ) {
    try {
      let query = {
        _id: task_id,
        user_id: user_id,
      };
      let data: any = {};
      if (task) {
        data.task = task;
      }
      if (date) {
        data.date = date;
      }
      if (status) {
        data.status = status;
      }
      let options = {
        new: true,
      };
      let result = await DAO.findOneAndUpdate(
        Models.Task,
        query,
        data,
        options
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async deletetask(task_id: string, user_id: string) {
    try {
      let query = {
        _id: task_id,
        user_id: user_id,
      };
      let result: any = await DAO.deleteOne(Models.Task, query);
      if (result.deletedCount > 0) {
        return { message: "Task deleted successfully" };
      } else {
        throw new Error("Task not found.");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getTasks(user_id: string, page: any, limit: any) {
    try {
      console.log("user id", user_id);
      let { skip, new_limit } = await Common.pagination(page, limit);
      console.log("skip", skip, "new_limit", new_limit);
      let pipeline = [
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $sort: {
            priority: -1,
            _id: -1,
          },
        },
        {
          $project: {
            __v: 0,
            user_id: 0,
            priority: 0,
          },
        },
        {
          $facet: {
            metadata: [{ $count: "count" }],
            data: [{ $skip: skip }, { $limit: new_limit }],
          },
        },
      ];
      let result = await DAO.aggregate(Models.Task, pipeline);
      let response = {
        count: !result[0].metadata[0] ? 0 : result[0].metadata[0].count,
        data: result[0].data,
      };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async sortTasks(user_id: string, task_sequence: Array<String>) {
    try {
      let length = task_sequence.length;
      await Promise.all(
        task_sequence.map((task_id, index) => {
          let query = {
            _id: task_id,
            user_id: user_id,
          };
          let data = {
            priority: length - index,
          };
          DAO.findOneAndUpdate(Models.Task, query, data, {});
          console.log("index", index);
        })
      );

      return { message: "Sequence changed" };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default TaskServices;
