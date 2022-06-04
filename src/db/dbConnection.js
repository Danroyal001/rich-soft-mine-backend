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

const mongoose = require('mongoose');

const exitProcess = __importDefault(require("../util/exitProcess"));
require("dotenv/config");

const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
const MONGO_ATLAS_USERNAME = process.env.MONGO_ATLAS_USERNAME;
const uri = `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@richsoftmine.xfbjl.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;

const dbConnection = async () => {
    const client = await mongoose.connect(uri, {
        appName: 'richSoftMine',
        dbName: 'richSoftMine',
        autoCreate: true,
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true,
    });

    client.Promise = Promise;

    return {
        db: client.connection.db,
        client,
    };
};

exports.default = dbConnection;
