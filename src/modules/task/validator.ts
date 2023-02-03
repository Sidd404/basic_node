const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import { handleJoiError, handleCatchError } from "../../middlewares";

const createTask = async (req: any, res: any, next: any) => {
  try {
    let schema: any = Joi.object({
      task: Joi.string().required().trim(),
      date: Joi.date().required(),
    });

    let { error } = schema.validate(req.body);

    if (error) {
      throw await handleJoiError(error);
    } else {
      next();
    }
  } catch (err) {
    handleCatchError(res, err);
  }
};
const editTask = async (req: any, res: any, next: any) => {
  try {
    let schema: any = Joi.object({
      task_id: Joi.objectId(),
      task: Joi.string().optional().trim(),
      date: Joi.date().optional(),
      status: Joi.string().optional().valid("Completed", "Incomplete"),
    });

    let { error } = schema.validate(req.body);

    if (error) {
      throw await handleJoiError(error);
    } else {
      next();
    }
  } catch (err) {
    handleCatchError(res, err);
  }
};
const deleteTask = async (req: any, res: any, next: any) => {
  try {
    let schema: any = Joi.object({
      _id: Joi.objectId(),
    });

    let { error } = schema.validate(req.params);

    if (error) {
      throw await handleJoiError(error);
    } else {
      next();
    }
  } catch (err) {
    handleCatchError(res, err);
  }
};
const getTask = async (req: any, res: any, next: any) => {
  try {
    let schema: any = Joi.object({
      page: Joi.string().optional().trim(),
      limit: Joi.string().optional().trim(),
    });

    let { error } = schema.validate(req.query);

    if (error) {
      throw await handleJoiError(error);
    } else {
      next();
    }
  } catch (err) {
    handleCatchError(res, err);
  }
};
const sortTasks = async (req: any, res: any, next: any) => {
  try {
    let schema: any = Joi.object({
      task_sequence: Joi.array().items(Joi.objectId()),
    });

    let { error } = schema.validate(req.query);

    if (error) {
      throw await handleJoiError(error);
    } else {
      next();
    }
  } catch (err) {
    handleCatchError(res, err);
  }
};
export { createTask, deleteTask, editTask, getTask, sortTasks };
