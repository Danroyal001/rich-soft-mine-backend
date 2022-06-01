import getUsers from './getUsers';

const generateBearerToken = async (email: string, password: string) => {

    const userExists = await getUsers({ email });

    if (!userExists) {
        throw new Error('This user does not exist');
    }

    const rawToken = `${email}:${password}`;
    const token = Buffer.from(rawToken).toString("base64");

    return token;
};

export default generateBearerToken;
