"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base64ToAscii = __importDefault(require("../base64ToAscii"));
const extractEmailAndPassword = (req) => {
    try {
        const authorization = req.header('Authorization');
        const encodedBearer = authorization?.split('Bearer ').pop();
        const bearer = (0, base64ToAscii.default)(encodedBearer);
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
