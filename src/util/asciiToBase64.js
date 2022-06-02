"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asciiToBase64 = (ascii) => {
    const buffer = Buffer.from(ascii, 'ascii');
    return buffer.toString('base64');
};
exports.default = asciiToBase64;
