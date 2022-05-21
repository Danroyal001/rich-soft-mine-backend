import { ObjectId } from "mongodb";
import userProfiles from "../collections/UserProfile";

const getUserProfile = async (user_id: string | ObjectId) => {
    return await (await userProfiles()).findOne({ _id: new ObjectId(user_id) });
};

export default getUserProfile;
