import { ObjectId } from "mongodb";
import users from "../collections/User";

const getUserByID = async (user_id: string | ObjectId) => {
    const id = new ObjectId(user_id);
    const user = await (await users()).findOne({ _id: id });

    return user;
};

export default getUserByID;
