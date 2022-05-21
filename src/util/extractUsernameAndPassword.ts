import { Request } from "express";
import base64ToAscii from "./base64ToAscii";

const extractUsernameAndPassword = (req: Request) => {
    const authorization = req.header('Authorization');
    const encodedBearer = authorization?.split('Bearer ').pop();
    const bearer = base64ToAscii(encodedBearer!);

    const [username, password] = bearer.split(':');

    return {
        username,
        password
    }
};

export default extractUsernameAndPassword;
