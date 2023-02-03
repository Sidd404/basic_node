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
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const Models = __importStar(require("./index"));
const status = ["Completed", "Incomplete"];
const taskSchema = (0, ts_mongoose_1.createSchema)({
    user_id: ts_mongoose_1.Type.ref(ts_mongoose_1.Type.objectId({ default: null })).to("users", Models.User),
    date: ts_mongoose_1.Type.date({ default: null }),
    task: ts_mongoose_1.Type.string({ default: null }),
    status: ts_mongoose_1.Type.string({ enum: status, default: "Incomplete" }),
    priority: ts_mongoose_1.Type.number({ default: 0 }),
}, {
    timestamps: true,
});
const Task = (0, ts_mongoose_1.typedModel)("task", taskSchema);
exports.default = Task;
