import { ObjectId, WithId } from "mongodb";
import users from "../collections/User";
import User from "../Schemas/User";

const updateUserProfile = async (user_id: string | ObjectId, newUserData: User | WithId<User>) => {
    const user = await (await users()).findOne({ _id: new ObjectId(user_id) });
    const response = (await users()).updateOne({ _id: new ObjectId(user_id) }, {
        ...user,
        ...newUserData
    });

    return {
        successful: true,
        insertID: (await response).acknowledged,
        payload: (await response)
    };
};

export default updateUserProfile;
