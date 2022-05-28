import { Document, ObjectId } from "mongodb";
import Chronological from "./Chronological";
import UserProfile from "./UserProfile";

export type UserTiers = 3_000 | 5_000 | 10_000;

export const UserTierCommisions: Record<UserTiers, {
    referrer: number,
    referred: number,
}> = {
    3_000: {
        referred: 1_500,
        referrer: 2_000,
    },
    5_000: {
        referred: 2_500,
        referrer: 3_000,
    },
    10_000: {
        referred: 6000,
        referrer: 6_000,
    },
}

interface User extends Chronological, Document {
    _id?: ObjectId;
    email?: string;
    password?: string;
    uplinkID?: ObjectId;
    roleID?: ObjectId;
    profile?: UserProfile,
    tier?: UserTiers,
}

export default User;