"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTasks = exports.getTask = exports.editTask = exports.deleteTask = exports.createTask = void 0;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const middlewares_1 = require("../../middlewares");
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = Joi.object({
            task: Joi.string().required().trim(),
            date: Joi.date().required(),
        });
        let { error } = schema.validate(req.body);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.createTask = createTask;
const editTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = Joi.object({
            task_id: Joi.objectId(),
            task: Joi.string().optional().trim(),
            date: Joi.date().optional(),
            status: Joi.string().optional().valid("Completed", "Incomplete"),
        });
        let { error } = schema.validate(req.body);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.editTask = editTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = Joi.object({
            _id: Joi.objectId(),
        });
        let { error } = schema.validate(req.params);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.deleteTask = deleteTask;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = Joi.object({
            page: Joi.string().optional().trim(),
            limit: Joi.string().optional().trim(),
        });
        let { error } = schema.validate(req.query);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.getTask = getTask;
const sortTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schema = Joi.object({
            task_sequence: Joi.array().items(Joi.objectId()),
        });
        let { error } = schema.validate(req.query);
        if (error) {
            throw yield (0, middlewares_1.handleJoiError)(error);
        }
        else {
            next();
        }
    }
    catch (err) {
        (0, middlewares_1.handleCatchError)(res, err);
    }
});
exports.sortTasks = sortTasks;
