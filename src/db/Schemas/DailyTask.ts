import { ObjectId } from "mongodb";

interface DailyTask {
    _id?: ObjectId;
    name?: string;
    description?: string;
    taskBannerURL?: string;

    createdAt?: Date;
    updatedAt?: Date;
};

export default DailyTask;