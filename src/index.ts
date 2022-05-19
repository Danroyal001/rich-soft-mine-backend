import express from 'express';

const PORT = 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.json());

app.get('/', () => { });

// --

// begin: user mamanagement
app.get('/users', () => {
    // TODO: get all users
});

app.get('/get-user/:id', () => { });

app.get('/current-user', (req, res) => { });

app.get('/user-roles', () => { });

app.get('/users-by-role', () => { });

app.get('/users-by-role/:role', () => { });

app.post('/create-user', (req, res) => { });

app.get('/get-user:user_id', (req, res) => { });

app.post('/update-user:user_id', (req, res) => { });

app.delete('/delete-user/:user_id', (req, res) => { });
// end: user management

// --

// begin: balance and transactions
app.get('/user-balance/:user_id', () => { });

app.get('/user-transactions/:user_id', () => { });

app.post('/create-transaction', (req, res) => { });

app.post('/update-transaction:transaction_id', (req, res) => { });

app.delete('/delete-transaction/:transaction_id', () => { });

app.get('/deposit', () => { });

app.get('/withdraw', () => { });
// end: balance and transactions

// --

// begin: referrals
app.get('/referral/:user_id', (req, res) => { });

app.get('/get-user-uplink/:user_id', () => { });

app.get('/get-user-downlinks/:user_id', () => { });
// end: referrals

// --

// begin: daily tasks
app.post('/create-daily-task', (req, res) => { });

app.get('/list-daily-tasks', (req, res) => { });

app.get('/get-daily-task/:task_id', (req, res) => { });

app.post('/execute-daily-task', (req, res) => { });

app.get('/get-executed-daily-tasks:user_id', (req, res) => { });
// end: daily tasks

// --

// begin: sponsored adverts
app.post('/create-sponsored-advert', (req, res) => { });

app.post('/request-sponsored-advert', (req, res) => { });

app.post('/approve-sponsored-advert', (req, res) => { });

app.post('/update-sponsored-advert:advert_id', (req, res) => { });

app.get('/get-sponsored-adverts', (req, res) => { });

app.get('/get-sponsored-advert/:advert_id', (req, res) => { });
// end: sponsored adverts

// --

app.get('/routes', (_, res) => {
    return res.json({
        status: 200,
        routes: app.routes
    });
});

// --

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
