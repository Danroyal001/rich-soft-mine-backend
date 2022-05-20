import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import exitProcess from '../util/exitProcess';
import 'dotenv/config';

const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;

console.log('MONGO_ATLAS_PASSWORD: ', MONGO_ATLAS_PASSWORD);

const uri = `mongodb+srv://richSoftMine:${MONGO_ATLAS_PASSWORD}@richsoftmine.xfbjl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

export interface DbConnection {
    db: Db;
    client: MongoClient;
}

const dbConnection = (): Promise<DbConnection> => {
    return new Promise((resolve) => {
        try {
            client.connect((err: any) => {

                if (err) return exitProcess(1, err);

                console.log('Connected to Mongo DB Atlas Successfully');

                return resolve({
                    db: client.db('richSoftMine'),
                    client,
                } as DbConnection);
            });
        } catch (error) {
            return exitProcess(1, error);
        }
    });
};

export default dbConnection;
