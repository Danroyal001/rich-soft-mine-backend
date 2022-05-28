import dbConnection from "../dbConnection";
import User from "../Schemas/User";

const users = async () => {
    const { db } = await dbConnection();

    return db.collection<User>('users');
}

export default users;
