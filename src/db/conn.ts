import { Db, MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

let dbConnection: Db;

export default {
    connectToServer(callback: any) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("sample_airbnb");
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb() {
        return dbConnection;
    },

};
