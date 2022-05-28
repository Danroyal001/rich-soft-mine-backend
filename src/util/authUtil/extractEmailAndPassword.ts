import { Request } from "express";
import base64ToAscii from "../base64ToAscii";

const extractEmailAndPassword = (req: Request) => {
    try {
        const authorization = req.header('Authorization');
        console.log('authorization: ', authorization);

        const encodedBearer = authorization?.split('Bearer ').pop();
        console.log('encodedBearer: ', encodedBearer);

        const bearer = base64ToAscii(encodedBearer!);
        console.log('bearer: ', bearer);

        const [email, password] = bearer.split(':');

        return {
            email,
            password
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export default extractEmailAndPassword;
