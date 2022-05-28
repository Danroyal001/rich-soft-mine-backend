import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

interface DailyTask extends Chronological {
    _id?: ObjectId;
    name?: string;
    description?: string;
    bannerURL?: string;
    points: number;

    doneBy: ObjectId[];
};

export default DailyTask;