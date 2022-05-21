import dbConnection from "../dbConnection";
import DailyTask from "../Schemas/DailyTask";

const dailyTasks = async () => {
    const { db } = await dbConnection();
    return db.collection<DailyTask>('users');
}

export default dailyTasks;
