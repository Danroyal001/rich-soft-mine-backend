"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ?
            mod :
            {
                default: mod,
            };
    };

const dbConnection = __importDefault(require("../dbConnection"));

const userRoles = async () => {
    const {
        db
    } = await (0, dbConnection.default)();
    return db.collection("users");
};
exports.default = userRoles;