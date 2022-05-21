import { ObjectId } from "mongodb";
import userRoles from "../collections/UserRoles";
import UserRoles from "../Schemas/UserRoles";

const createRole = async (roleData: UserRoles) => {
    const roleInExistence = (await userRoles()).findOne({ name: roleData.name! });

    let response = {
        alreadyExists: false,
        role: null
    } as {
        alreadyExists: boolean;
        role?: UserRoles | null
    };

    if (roleInExistence != null) {
        response.alreadyExists = true;
        response.role = null;

        return response;
    }

    const insert = await (await userRoles()).insertOne(roleData)
    response.alreadyExists = false;
    response.role = await (await userRoles()).findOne({ _id: new ObjectId(insert.insertedId) });

    return response;
};

export default createRole;
