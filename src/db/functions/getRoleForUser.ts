import { ObjectId } from "mongodb";
import users from "../collections/User";
import userRoles from "../collections/UserRoles";

const getRoleForUser = async (user_id: string | ObjectId) => {
    const user = await (await users()).findOne({ _id: new ObjectId(user_id) });
    const roleID = user!.roleID!;

    const role = await (await userRoles()).findOne({ _id: new ObjectId(roleID) });

    return role;
};

export default getRoleForUser;