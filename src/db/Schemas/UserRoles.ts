import { ObjectId } from "mongodb";

interface UserRoles {
    _id?: ObjectId;
    name?: 'Admin' | 'RSM Vendor' | 'Regular' | 'Generic';

    createdAt?: Date;
    updatedAt?: Date;
}

export default UserRoles;