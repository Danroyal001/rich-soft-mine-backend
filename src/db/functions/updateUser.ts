import { ObjectId, WithId } from "mongodb";
import hashPassword from "../../util/hashPassword";
import users from "../collections/User";
import User from "../Schemas/User";

const updateUser = async (oldUser: User | WithId<User>, newUser: User) => {
    let user: WithId<User> | User | null = await (await users()).findOne({ _id: oldUser._id })

    if (newUser.password) {
        const newPassword = await hashPassword(newUser.password!);
        user!.password! = newPassword;
        newUser.password = void 0;
    }

    newUser._id = new ObjectId(newUser._id);

    user = { ...user, ...newUser };
    const response = await (await users()).updateOne({ _id: new ObjectId(oldUser._id) }, user);

    return response.acknowledged;
};

export default updateUser;
