import { ObjectId } from "mongodb";
import users from "../collections/User";

const deleteUser = async (user_id: string | ObjectId) => {
    const response = await (await users()).deleteOne({ _id: new ObjectId(user_id) });
    return response.acknowledged;
};

export default deleteUser;
