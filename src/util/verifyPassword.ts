import bcrypt from 'bcrypt';

const verifyPassword = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(rawPassword, hashedPassword);
};

export default verifyPassword;
