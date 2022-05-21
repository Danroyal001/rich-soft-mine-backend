import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

interface DailyTask extends Chronological {
    _id?: ObjectId;
    name?: string;
    description?: string;
    taskBannerURL?: string;
};

export default DailyTask;