import authenticate from "./authenticate";

const getUserFromBearerToken = async (bearerToken: string) => {
    const rawToken = Buffer.from(bearerToken, "base64").toString('ascii');
    const [email, password] = rawToken.split(':');

    const user = authenticate(email, password);

    return user;
};

export default getUserFromBearerToken;
