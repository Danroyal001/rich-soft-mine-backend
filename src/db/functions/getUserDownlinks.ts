import { ObjectId } from "mongodb";
import users from "../collections/User";

const getUserDownlinks = async (user_id: string | ObjectId) => {
    return await (await users()).find({ uplinkID: new ObjectId(user_id) }).toArray();
};

export default getUserDownlinks;
