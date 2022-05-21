import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

interface UserProfile extends Chronological {
    _id?: ObjectId;
    userID?: ObjectId;

    username?: string;
    firstName?: string;
    surName?: string;
    otherNames?: string;
    phoneNumber?: string;
}

export default UserProfile;