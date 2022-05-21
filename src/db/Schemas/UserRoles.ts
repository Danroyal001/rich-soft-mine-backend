import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

export type RoleName = 'Admin' | 'RSM Vendor' | 'Regular' | 'Generic' | 'Invalid';

interface UserRoles extends Chronological {
    _id?: ObjectId;
    name?: RoleName;
}

export default UserRoles;