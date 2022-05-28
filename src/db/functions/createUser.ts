import { WithId } from "mongodb";
import hashPassword from "../../util/hashPassword";
import users from "../collections/User";
import User from "../Schemas/User";

const createUser = async (properties: User) => {
    let userExists = await (await users()).findOne({ email: properties.email! })!;

    console.log(userExists);

    const response: { alreadyExists?: boolean; user?: WithId<User> | User } = {};

    if (userExists) {
        response.alreadyExists = true;
        response.user = void 0;
        console.log('user already exists: ', response);

        throw new Error('User already exists');
    }

    if (properties.password) {
        properties!.password! = await hashPassword(properties!.password!);
    }

    const insertedUser = await (await users()).insertOne(properties)!;

    const user = await (await users()).findOne({ _id: insertedUser.insertedId })!;

    response.alreadyExists = false;
    response.user = user!;

    return response;
};

export default createUser;
