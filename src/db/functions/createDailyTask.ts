import dailyTasks from "../collections/DailyTask";

const createDailyTask = async (name: string, description: string, points: number, bannerURL?: string) => {
    const task = await (await dailyTasks()).insertOne({
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

export default createDailyTask;
