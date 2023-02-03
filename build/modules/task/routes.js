"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const controller_1 = __importDefault(require("./controller"));
const validator_1 = require("./validator");
const router = (0, express_1.Router)();
router.post("/", middlewares_1.auth, validator_1.createTask, controller_1.default.createTask);
router.patch("/", middlewares_1.auth, validator_1.editTask, controller_1.default.editTask);
router.get("/", middlewares_1.auth, validator_1.getTask, controller_1.default.getTasks);
router.delete("/:_id", middlewares_1.auth, validator_1.deleteTask, controller_1.default.deleteTask);
router.put("/sort", middlewares_1.auth, validator_1.sortTasks, controller_1.default.sortTasks);
exports.default = router;
