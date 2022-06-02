"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64ToAscii = (base64) => {
    try {
        const buffer = Buffer.from(base64, 'base64');
        return buffer.toString('ascii');
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
exports.default = base64ToAscii;
