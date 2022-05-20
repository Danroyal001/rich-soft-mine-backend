import express from 'express';
import 'dotenv/config';
import dbConnection from './db/dbConnection';

const PORT = Number(process.env.PORT) || 8080;
const app = express();

const SERVER_RUNNING_MESSAGE = `Server is running at http://127.0.0.1:${PORT}` as const;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.json());

app.get('/', (_, res) => {
    return res.send(SERVER_RUNNING_MESSAGE);
});

// --

app.get('/test-db-connection', async (_, res) => {
    const conn = await dbConnection();
    return res.json({
        db: conn.db.databaseName
    });
});

// --

// begin: user mamanagement
app.get('/users', async (_, res) => {
    const conn = await dbConnection();

    const users = await conn.db.collection('users').find({}).toArray();

    return res.json({
        users
    });
});

app.get('/get-user:user_id', async () => { });

app.get('/current-user', async () => { });

app.get('/user-roles', async () => { });

app.get('/users-by-role', async () => { });

app.get('/users-by-role/:role', async () => { });

app.post('/create-user', async () => { });


app.post('/update-user:user_id', async () => { });

app.delete('/delete-user/:user_id', async () => { });
// end: user management

// --

// begin: balance and transactions
app.get('/user-balance/:user_id', async () => { });

app.get('/user-transactions/:user_id', async () => { });

app.post('/create-transaction', async () => { });

app.post('/update-transaction:transaction_id', async () => { });

app.delete('/delete-transaction/:transaction_id', async () => { });

app.get('/deposit', async () => { });

app.get('/withdraw', async () => { });
// end: balance and transactions

// --

// begin: referrals
app.get('/referral/:user_id', async () => { });

app.get('/get-user-uplink/:user_id', async () => { });

app.get('/get-user-downlinks/:user_id', async () => { });
// end: referrals

// --

// begin: daily tasks
app.post('/create-daily-task', async () => { });

app.get('/list-daily-tasks', async () => { });

app.get('/get-daily-task/:task_id', async () => { });

app.post('/execute-daily-task', async () => { });

app.get('/get-executed-daily-tasks:user_id', async () => { });
// end: daily tasks

// --

// begin: sponsored adverts
app.post('/create-sponsored-advert', async () => { });

app.post('/request-sponsored-advert', async () => { });

app.post('/approve-sponsored-advert', async () => { });

app.post('/update-sponsored-advert:advert_id', async () => { });

app.get('/get-sponsored-adverts', async () => { });

app.get('/get-sponsored-advert/:advert_id', async () => { });
// end: sponsored adverts

// --

app.get('/routes', (_, res) => {
    return res.json({
        status: 200,
        routes: app.routes
    });
});

// --

app.listen(PORT, async () => {
    console.log(SERVER_RUNNING_MESSAGE);
});
