import { ObjectId } from "mongodb";
import users from "../db/collections/User";
import userRoles from "../db/collections/UserRoles";
import { RoleName } from "../db/Schemas/UserRoles";

const getAdmin = async () => {
    return await (
        await users()
    ).findOne({
        roleID: new ObjectId(
            (
                await (
                    await userRoles()
                ).findOne({
                    name: "Admin" as RoleName,
                })
            )?._id!
        ),
    });
};

export default getAdmin;
