const base64ToAscii = (base64: string) => {
    const buffer = Buffer.from(base64, 'base64');

    return buffer.toString('ascii');
};

export default base64ToAscii;