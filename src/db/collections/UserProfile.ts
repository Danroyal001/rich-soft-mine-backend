import dbConnection from "../dbConnection";
import UserProfile from "../Schemas/UserProfile";

const userProfiles = async () => {
    const { db } = await dbConnection();
    return db.collection<UserProfile>('users');
}

export default userProfiles;
