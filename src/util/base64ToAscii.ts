const base64ToAscii = (base64: string) => {
    try {
        const buffer = Buffer.from(base64, 'base64');

        return buffer.toString('ascii');
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export default base64ToAscii;