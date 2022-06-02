"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const exitProcess_1 = __importDefault(require("../util/exitProcess"));
require("dotenv/config");
const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
const uri = `mongodb+srv://richSoftMine:${MONGO_ATLAS_PASSWORD}@richsoftmine.xfbjl.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;
const client = new mongodb_1.MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverApi: mongodb_1.ServerApiVersion.v1
});
const dbConnection = () => {
    return new Promise((resolve) => {
        console.log(`Connecting to database at ${uri}`);
        try {
            client.connect((err) => {
                if (err)
                    return (0, exitProcess_1.default)(1, err);
                console.log('Connected to Mongo DB Atlas Successfully');
                return resolve({
                    db: client.db('richSoftMine', {
                        ignoreUndefined: true,
                    }),
                    client,
                });
            });
        }
        catch (error) {
            return (0, exitProcess_1.default)(1, error);
        }
    });
};
exports.default = dbConnection;
