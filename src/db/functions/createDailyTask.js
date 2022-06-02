"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DailyTask_1 = __importDefault(require("../collections/DailyTask"));
const createDailyTask = async (name, description, points, bannerURL) => {
    const task = await (await (0, DailyTask_1.default)()).insertOne({
        createdAt: new Date,
        description,
        name,
        points,
        bannerURL,
        updatedAt: new Date,
        doneBy: [],
    });
    return task.acknowledged;
};
exports.default = createDailyTask;
