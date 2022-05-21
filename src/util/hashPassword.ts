import bcrypt from 'bcrypt';

const hashPassword = async (rawPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(rawPassword, salt);
};

export default hashPassword;
