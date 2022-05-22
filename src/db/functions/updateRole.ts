import { ObjectId } from "mongodb";
import userRoles from "../collections/UserRoles";
import UserRoles from "../Schemas/UserRoles";

const updateRole = async (role_id: string | ObjectId, newRoleData: UserRoles) => {
    let role = await (await userRoles()).findOne({ _id: new ObjectId(role_id) }) as UserRoles;
    role = {
        ...role,
        ...(newRoleData as UserRoles)
    }

    return await (await userRoles()).updateOne({ _id: new ObjectId(role_id) }, role);
};

export default updateRole;
