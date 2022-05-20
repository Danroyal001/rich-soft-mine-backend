import { ObjectId } from "mongodb";

interface User {
    _id?: ObjectId;
    password?: string;
    uplinkID?: ObjectId;
    roleID?: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export default User;