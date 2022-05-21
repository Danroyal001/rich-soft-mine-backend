import { ObjectId } from "mongodb";
import users from "../collections/User";

const setUserRole = async (user_id: string | ObjectId, role_id: string | ObjectId) => {
    const user = await (await users()).findOne({ _id: new ObjectId(user_id) });
    user!.roleID = new ObjectId(role_id);

    return (await (await users()).updateOne({ _id: new ObjectId(user_id) }, user!)).acknowledged;
};

export default setUserRole;
