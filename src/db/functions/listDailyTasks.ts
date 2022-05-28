import dailyTasks from "../collections/DailyTask";

const listDailyTasks = async (createdAt: Date) => {
    const tasks = await (await dailyTasks()).find({
        createdAt,
    }).toArray();

    return tasks;
};

export default listDailyTasks;
