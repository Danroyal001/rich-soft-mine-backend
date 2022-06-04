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

Object.defineProperty(exports, "__esModule", {
    value: true,
});

const mongodb = require("mongodb");

const mongoose = require('mongoose');

const exitProcess = __importDefault(require("../util/exitProcess"));
require("dotenv/config");

const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
const MONGO_ATLAS_USERNAME = process.env.MONGO_ATLAS_USERNAME;
const uri = `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@richsoftmine.xfbjl.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;

const client = new mongodb.MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverApi: mongodb.ServerApiVersion.v1,
});

const _dbConnection = async () => {
    const client = await mongoose.connect(uri, {
        appName: 'richSoftMine',
        autoCreate: true,
        pass
    });

    // client
};

const dbConnection = () => {
    return new Promise((resolve) => {
        try {
            client.connect((err) => {
                if (err) return (0, exitProcess.default)(1, err);
                return resolve({
                    db: client.db("richSoftMine", {
                        ignoreUndefined: true,
                    }),
                    client,
                });
            });
        } catch (error) {
            console.error(error);
            return (0, exitProcess.default)(1, error);
        }
    });
};

exports.default = dbConnection;
