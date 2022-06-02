"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const exitProcess = __importDefault(require("../util/exitProcess"));
require("dotenv/config");
const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
const uri = `mongodb+srv://richSoftMine:${MONGO_ATLAS_PASSWORD}@richsoftmine.xfbjl.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;
const client = new mongodb.MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverApi: mongodb.ServerApiVersion.v1
});
const dbConnection = () => {
    return new Promise((resolve) => {
        try {
            client.connect((err) => {
                if (err)
                    return (0, exitProcess.default)(1, err);
                return resolve({
                    db: client.db('richSoftMine', {
                        ignoreUndefined: true,
                    }),
                    client,
                });
            });
        }
        catch (error) {
            console.error(error);
            return (0, exitProcess.default)(1, error);
        }
    });
};
exports.default = dbConnection;
