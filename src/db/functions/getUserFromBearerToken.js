"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate = __importDefault(require("./authenticate"));
const getUserFromBearerToken = async (bearerToken) => {
    const rawToken = Buffer.from(bearerToken, "base64").toString('ascii');
    const [email, password] = rawToken.split(':');
    const user = (0, authenticate.default)(email, password);
    return user;
};
exports.default = getUserFromBearerToken;
