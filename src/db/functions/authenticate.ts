import verifyPassword from "../../util/verifyPassword";
import getUsers from "./getUsers";

const authenticate = async (email: string, password: string) => {
    const [user] = await getUsers({ email });
    if (!user) {
        throw new Error('user does not exist');
    }

    console.log(password, user.password!);
    const verified = await verifyPassword(password, user.password!);
    if (!verified) {
        throw new Error('Incorrect password');
    }

    return user;
};

export default authenticate;
