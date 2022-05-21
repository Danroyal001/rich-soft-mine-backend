import dbConnection from "../dbConnection";
import UserRoles from "../Schemas/UserRoles";

const userRoles = async () => {
    const { db } = await dbConnection();
    return db.collection<UserRoles>('users');
}

export default userRoles;
