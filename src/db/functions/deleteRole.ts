import { ObjectId } from "mongodb";
import userRoles from "../collections/UserRoles";

const deleteRole = async (role_id: string | ObjectId) => {
    return await (await userRoles()).deleteOne({ _id: new ObjectId(role_id) });
};

export default deleteRole;
