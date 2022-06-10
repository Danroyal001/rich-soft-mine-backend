"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };

Object.defineProperty(exports, "__esModule", { value: true });


const User = __importDefault(require("../db/collections/User"));
const UserRoles = __importDefault(require("../db/collections/UserRoles"));
const getAdmin = async () => {
    return await (
        await (0, User.default)()
    ).findOne({
        roleID:
            (
                await (
                    await (0, UserRoles.default)()
                ).findOne({
                    name: "Admin",
                })
            )?._id,
    });
};
exports.default = getAdmin;
