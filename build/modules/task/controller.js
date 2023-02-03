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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../../middlewares");
const services_1 = __importDefault(require("./services"));
class TaskController {
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { task, date } = req.body;
                const { _id: user_id } = req.user;
                const result = yield services_1.default.createtask(user_id, task, date);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static editTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { task_id, task, date, status } = req.body;
                const { _id: user_id } = req.user;
                const result = yield services_1.default.editTask(user_id, task_id, task, date, status);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { _id: task_id } = req.params;
                const { _id: user_id } = req.user;
                const result = yield services_1.default.deletetask(task_id, user_id);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id: user_id } = req.user;
                var { page, limit } = req.query;
                const result = yield services_1.default.getTasks(user_id, page, limit);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
    static sortTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id: user_id } = req.user;
                var { task_sequence } = req.body;
                const result = yield services_1.default.sortTasks(user_id, task_sequence);
                console.log("result", result);
                (0, middlewares_1.handleSuccess)(res, result);
            }
            catch (error) {
                (0, middlewares_1.handleCatchError)(res, error);
            }
        });
    }
}
exports.default = TaskController;
