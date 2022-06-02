"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const DailyTask_1 = __importDefault(require("../collections/DailyTask"));
const getDailyTaskByID = async (task_id) => {
    const task = await (await (0, DailyTask_1.default)()).findOne({
        _id: new mongodb_1.ObjectId(task_id),
    });
    return task;
};
exports.default = getDailyTaskByID;
