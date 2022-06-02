"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DailyTask_1 = __importDefault(require("../collections/DailyTask"));
const listDailyTasks = async (createdAt) => {
    const tasks = await (await (0, DailyTask_1.default)()).find({
        createdAt,
    }).toArray();
    return tasks;
};
exports.default = listDailyTasks;
