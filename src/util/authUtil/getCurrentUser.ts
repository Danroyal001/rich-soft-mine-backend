import { Request } from "express";
import getUsers from "../../db/functions/getUsers";
import verifyPassword from "../verifyPassword";
import extractEmailAndPassword from "./extractEmailAndPassword";

const getCurrentUser = async (req: Request) => {
    const { email, password } = extractEmailAndPassword(req);

    const [user] = await getUsers({
        email,
    });

    const verified = await verifyPassword(password, user!.password!);

    if (!verified) {
        throw new Error("Invalid password");
    }

    return user;
};

export default getCurrentUser;
