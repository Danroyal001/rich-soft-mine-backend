import { ObjectId } from "mongodb";

interface UserProfile {
    _id?: ObjectId;
    userID?: ObjectId;

    username?: string;
    firstName?: string;
    surName?: string;
    otherNames?: string;
    email?: string;
    phoneNumber?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export default UserProfile;