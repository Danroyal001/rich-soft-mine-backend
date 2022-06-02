"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = __importDefault(require("../../util/hashPassword"));
const User_1 = __importDefault(require("../collections/User"));
const createUser = async (properties) => {
    let userExists = await (await (0, User_1.default)()).findOne({ email: properties.email });
    console.log(userExists);
    const response = {};
    if (userExists) {
        response.alreadyExists = true;
        response.user = void 0;
        console.log('user already exists: ', response);
        throw new Error('User already exists');
    }
    if (properties.password) {
        properties.password = await (0, hashPassword_1.default)(properties.password);
    }
    const insertedUser = await (await (0, User_1.default)()).insertOne(properties);
    const user = await (await (0, User_1.default)()).findOne({ _id: insertedUser.insertedId });
    response.alreadyExists = false;
    response.user = user;
    return response;
};
exports.default = createUser;
