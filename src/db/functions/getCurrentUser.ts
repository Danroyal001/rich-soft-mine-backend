import verifyPassword from "../../util/verifyPassword";
import users from "../collections/User";

const getCurrentUser = async (email: string, password: string) => {
    const userWithThisEmail = await (await users()).findOne({ email })
    const passwordVerified = await verifyPassword(password, userWithThisEmail?.password!);

    if (!passwordVerified) {
        throw new Error('Could not authenticate current user');
    }

    return userWithThisEmail;
};

export default getCurrentUser;
