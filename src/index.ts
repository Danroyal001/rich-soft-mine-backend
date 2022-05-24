import express from "express";
import "dotenv/config";
import dbConnection from "./db/dbConnection";
import getUsers from "./db/functions/getUsers";
import users from "./db/collections/User";
import { ObjectId } from "mongodb";
import extractUsernameAndPassword from "./util/extractUsernameAndPassword";
import getCurrentUser from "./db/functions/getCurrentUser";
import createUser from "./db/functions/createUser";
import updateUser from "./db/functions/updateUser";
import getUserByID from "./db/functions/getUserByID";
import deleteUser from "./db/functions/deleteUser";
import getUserProfile from "./db/functions/getUserProfile";
import fluidQuery from "./util/fluidQuery";
import User from "./db/Schemas/User";
import updateUserProfile from "./db/functions/updateUserProfile";
import getUserRoles from "./db/functions/getUserRoles";
import getRoleForUser from "./util/getRoleForUser";
import setUserRole from "./db/functions/setUserRole";
import createRole from "./db/functions/createRole";
import updateRole from "./db/functions/updateRole";
import deleteRole from "./db/functions/deleteRole";
import requestKit from "./util/requestKit";
import getUserBalance from "./db/functions/getUserBalance";
import getUserTransactions from "./db/functions/getUserTransactions";
import initiateTransaction from "./db/functions/initiateTransaction";
import updateTransactionData from "./db/functions/updateTransactionData";
import deleteTransaction from "./db/functions/deleteTransaction";
import debitUser from "./db/functions/debitUser";
import credituser from "./db/functions/creditUser";
import getUserUplink from "./db/functions/getUserUplink";
import getUserDownlinks from "./db/functions/getUserDownlinks";
// import http from 'http';
// import https from 'https';

const TIME_LABEL = "Server startup time";
console.time(TIME_LABEL);

const PORT = Number(process.env.PORT) || 8080;
const app = express();

const SERVER_RUNNING_MESSAGE =
    `Server is running at http://127.0.0.1:${PORT}` as const;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.json());

app.use((req, _, next) => {
    console.log(
        `\nRequest event received for url "${req.url
        }" with method "${req.method.toUpperCase()}" at time "${new Date()}"\n`
    );

    return next();
});

app.get("/", (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, () => {
        return res.send(SERVER_RUNNING_MESSAGE);
    })
);

// --

app.get("/test-db-connection", async (_, res) => {
    const conn = await dbConnection();
    return res.status(200).json({
        db: conn.db.databaseName,
    });
});

// --

// begin: user mamanagement
app.get("/users", async (req, res) => {
    return res.status(200).json({
        users: await getUsers(req.query as any as User),
    });
});

app.get("/get-user/:user_id", async (req, res) => {
    return res.status(200).json({
        user: (await users()).find({
            _id: new ObjectId(req.params.user_id),
        }),
    });
});

app.get("/current-user", async (req, res) => {
    const { username, password } = extractUsernameAndPassword(req);
    const currentuser = await getCurrentUser(username, password);

    return res.status(200).json({
        user: currentuser,
    });
});

app.post("/create-user", async (req, res) => {
    const user = await createUser(req.body);

    return res.status(200).json({
        user,
    });
});

app.post("/update-user/:user_id", async (req, res) => {
    const updated = updateUser(
        (await getUserByID(req.params.user_id))!,
        req.body
    );

    return res.status(200).json({
        updated,
    });
});

app.delete("/delete-user/:user_id", async (req, res) => {
    return res.status(200).json({
        deleted: await deleteUser(new ObjectId(req.params.user_id)),
    });
});
// end: user management

// --

// begin: profile management
app.get("/get-user-profile/:user_id", async (req, res) => {
    return res.status(200).json({
        profile: await getUserProfile(req.params.user_id)!,
    });
});

app.post("/update-user-profile/:user_id", async (req, res) => {
    return res
        .status(200)
        .json(await updateUserProfile(req.params.user_id, JSON.parse(req.body)));
});
// end: profile management

// --

// begin: role management
app.get("/get-user-roles", async (_, res) => {
    return res.status(200).json({
        roles: await getUserRoles(),
    });
});

app.get("/get-user-role/:user_id", async (req, res) => {
    return res.status(200).json({
        role: await getRoleForUser(req.params.user_id),
    });
});

app.post("/set-user-role/:user_id/:role_id", async (req, res) => {
    return res.status(200).json({
        successful: await setUserRole(req.params.user_id, req.params.role_id),
    });
});

app.post("/create-role", async (req, res) => {
    return res.status(200).json(await createRole(JSON.parse(req.body)));
});

app.post("/update-role/:role_id", async (req, res) => {
    return res
        .status(200)
        .json(await updateRole(req.params.role_id, JSON.parse(req.body.roleData)));
});

app.delete("/delete-role/:role_id", async (req, res) => {
    return res.status(200).json(await deleteRole(req.params.role_id));
});
// end: role management

// --

// begin: balance and transactions
app.get("/user-balance/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            balance: await getUserBalance(req.params.user_id),
        });
    });
});

app.get("/get-user-transactions/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            transactions: await getUserTransactions(req.params.user_id),
        });
    });
});

app.post(
    "/initiate-transaction/:initiating_user_id",
    async (req, res, next) => {
        return requestKit.handleRequestSafely(req, res, next, async () => {
            return res.status(200).json({
                transactionDetails: await initiateTransaction(
                    req.params.initiating_user_id,
                    req.body.recipient_user_id,
                    Number(req.body.amount_in_naira),
                    req.body.narration,
                    req.body.currency as any
                ),
            });
        });
    }
);

app.post("/update-transaction/:transaction_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await updateTransactionData(req.params.transaction_id, JSON.parse(req.body)));
    });
});

app.delete("/delete-transaction/:transaction_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await deleteTransaction(req.params.transaction_id));
    });
});

app.get("/debit-user/:user_id/:amount_in_naira", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await debitUser(req.params.user_id, Number(req.params.amount_in_naira)));
    });
});

app.get("/credit-user/:user_id/:amount_in_naira", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await credituser(req.params.user_id, Number(req.params.amount_in_naira)));
    });
});
// end: balance and transactions

// --

// begin: referrals
app.get("/refer-user/:referrer_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/get-user-uplink/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await getUserUplink(req.params.user_id))
    });
});

app.get("/get-user-downlinks/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            downlinks: await getUserDownlinks(req.params.user_id)
        })
    });
});
// end: referrals

// --

// begin: daily tasks
app.post("/create-daily-task", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/list-daily-tasks", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/get-daily-task/:task_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.post("/execute-daily-task", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/get-executed-daily-tasks:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});
// end: daily tasks

// --

// begin: sponsored adverts
app.post("/create-sponsored-advert", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.post("/request-sponsored-advert", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.post("/approve-sponsored-advert", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.post("/update-sponsored-advert:advert_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/get-sponsored-adverts", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get("/get-sponsored-advert/:advert_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});
// end: sponsored adverts

// --

app.get("/routes", (_, res) => {
    return res.status(200).json({
        status: 200,
        routes: (() => requestKit.routes)() || {},
    });
});

// --

// begin: currency conversion
app.get("/get-currency-conversion-rates", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        //
    });
});

app.get(
    "/get-conversion-rate-for-currency/:currency_code",
    async (req, res, next) => {
        return requestKit.handleRequestSafely(req, res, next, async () => {
            //
        });
    }
);
// end: currency conversion

// --

app.get("/fluid-query", async (req, res) => {
    return res.status(200).json({
        payload: await fluidQuery(JSON.parse(req.query.fluidQuery! as string)),
    });
});

// --

app.get("/event-names", (_, res) => {
    return res.status(200).json({
        eventNames: (app.eventNames() || []) as (string | Symbol)[],
    });
});

// --

app.all("/error", (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, () => {
        throw new Error("Demo Error");
    })
);

// --

app.use((req, res) => {
    if (!req.complete) {
        const NOT_FOUND_MESSAGE = "404 - Route not found";

        if (req.xhr)
            return res.status(404).json({
                status: 404,
                message: NOT_FOUND_MESSAGE,
            });

        return res.status(404).send(NOT_FOUND_MESSAGE);
    }
});

// --

app.post('/seed-db', async () => {
    // 
});

// --

app.listen(PORT, async () => {
    console.clear();
    console.log(SERVER_RUNNING_MESSAGE);
    console.timeEnd(TIME_LABEL);
});

// http.createServer(app).listen(80, () => {
//     https.createServer({}, app).listen(443);
// });
