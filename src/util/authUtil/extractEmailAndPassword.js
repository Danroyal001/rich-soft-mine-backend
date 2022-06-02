"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base64ToAscii_1 = __importDefault(require("../base64ToAscii"));
const extractEmailAndPassword = (req) => {
    try {
        const authorization = req.header('Authorization');
        console.log('authorization: ', authorization);
        const encodedBearer = authorization?.split('Bearer ').pop();
        console.log('encodedBearer: ', encodedBearer);
        const bearer = (0, base64ToAscii_1.default)(encodedBearer);
        console.log('bearer: ', bearer);
        const [email, password] = bearer.split(':');
        return {
            email,
            password
        };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
};
exports.default = extractEmailAndPassword;
