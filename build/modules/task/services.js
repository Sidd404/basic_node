"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Models = __importStar(require("../../models"));
const DAO_1 = __importDefault(require("../../DAO"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../../middlewares/index");
class TaskServices {
    static createtask(user_id, task, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = {
                    user_id: user_id,
                    task: task,
                    date: date,
                };
                let result = yield DAO_1.default.saveDocument(Models.Task, data);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static editTask(user_id, task_id, task, date, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    _id: task_id,
                    user_id: user_id,
                };
                let data = {};
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
                let result = yield DAO_1.default.findOneAndUpdate(Models.Task, query, data, options);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static deletetask(task_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {
                    _id: task_id,
                    user_id: user_id,
                };
                let result = yield DAO_1.default.deleteOne(Models.Task, query);
                if (result.deletedCount > 0) {
                    return { message: "Task deleted successfully" };
                }
                else {
                    throw new Error("Task not found.");
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static getTasks(user_id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user id", user_id);
                let { skip, new_limit } = yield index_1.Common.pagination(page, limit);
                console.log("skip", skip, "new_limit", new_limit);
                let pipeline = [
                    {
                        $match: {
                            user_id: new mongoose_1.default.Types.ObjectId(user_id),
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
                let result = yield DAO_1.default.aggregate(Models.Task, pipeline);
                let response = {
                    count: !result[0].metadata[0] ? 0 : result[0].metadata[0].count,
                    data: result[0].data,
                };
                return response;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static sortTasks(user_id, task_sequence) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let length = task_sequence.length;
                yield Promise.all(task_sequence.map((task_id, index) => {
                    let query = {
                        _id: task_id,
                        user_id: user_id,
                    };
                    let data = {
                        priority: length - index,
                    };
                    DAO_1.default.findOneAndUpdate(Models.Task, query, data, {});
                    console.log("index", index);
                }));
                return { message: "Sequence changed" };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = TaskServices;
