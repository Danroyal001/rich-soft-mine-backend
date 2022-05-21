import { WithId } from "mongodb";
import users from "../collections/User";
import User from "../Schemas/User";

const getUsers = async (query: User | WithId<User> = {}) => {
    const _users = (await users()).find(query).toArray();

    return _users;
};

export default getUsers;
