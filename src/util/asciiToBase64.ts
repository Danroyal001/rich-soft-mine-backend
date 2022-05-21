const asciiToBase64 = (ascii: string) => {
    const buffer = Buffer.from(ascii, 'ascii');

    return buffer.toString('base64');
};

export default asciiToBase64;
