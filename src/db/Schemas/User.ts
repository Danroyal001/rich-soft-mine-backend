import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

interface User extends Chronological {
    _id?: ObjectId;
    email?: string;
    password?: string;
    uplinkID?: ObjectId;
    roleID?: ObjectId;
}

export default User;