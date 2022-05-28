import { ObjectId } from "mongodb";
import dailyTasks from "../collections/DailyTask";

const getDailyTaskByID = async (task_id: string | number | ObjectId) => {
    const task = await (await dailyTasks()).findOne({
        _id: new ObjectId(task_id),
    });

    return task!;
};

export default getDailyTaskByID;
