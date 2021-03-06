"use strict";

const express = require("express");
require("dotenv/config");
const dbConnection = require("./db/dbConnection");
const { default: updateUser } = require("./db/functions/updateUser");

const { default: getUsers } = require("./db/functions/getUsers");
const User = require("./db/Schemas/User");
const { default: requestKit } = require("./util/requestKit");
const getUserDownlinks = require("./db/functions/getUserDownlinks");
const generateBearerToken = require("./db/functions/generateBearerToken");
const getCurrentUser = require("./util/authUtil/getCurrentUser");

const cors = require("cors");
const { default: authenticate } = require("./db/functions/authenticate");
const mongoose = require("mongoose");

const { default: users } = require("./db/dailyLogin/User");

const { default: createUser } = require("./db/functions/createUser");
const {
    default: generateCouponCode,
} = require("./db/functions/generateCouponCode");
const TIME_LABEL = "Server startup time";

const PORT = Number(process.env.PORT) || 8080;

console.time(TIME_LABEL);

const app = express();

const SERVER_RUNNING_MESSAGE = `RichSoftMine backend is running at http://127.0.0.1:${PORT}`;

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());
app.use(express.text());
app.use(express.json());
app.use(cors());

// --
app.use((req, _, next) => {
    console.log(
        `\nRequest event received for url "${req.url
        }" with method "${req.method.toUpperCase()}" at time "${new Date()}"`
    );
    return next();
});
// completed

app.get("/", (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, () => {
        return res.send(SERVER_RUNNING_MESSAGE);
    })
);
// completed

// --

app.get("/test-db-connection", async (_, res) => {
    const {
        db: { databaseName },
    } = await dbConnection.default();
    return res.status(200).json({
        status: 200,
        db: databaseName,
    });
});
// completed

// --

// begin: user authentication
app.post("/login", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        const { email, password } = req.body;

        const user = await authenticate(email, password);

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User does not exist!",
            });
        }

        const token = await generateBearerToken.default(email, password);
        return res.status(200).json({
            status: 200,
            token,
            user,
            message: 'Logged in successfully!'
        });
    })
);
// completed

app.post("/register", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        try {
            const _user = await authenticate(email, password);
            if (_user) {
                return res.status(400).json({
                    status: 400,
                    message: "User already exists!",
                });
            }
        } catch (error) {
            //
        }

        const user = await createUser(req.body);

        return res.status(200).json({
            status: 200,
            user,
        });
    })
);
// completed

app.get("/current-user", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        const currentUser = await (0, getCurrentUser.default)(req);
        return res.status(200).json({
            status: 200,
            user: currentUser,
        });
    })
);
// completed

app.post("/update-user/:user_id", async (req, res) => {
    const updated = updateUser(
        (
            await getUsers.default({
                _id: req.params.user_id,
            })
        )[0],
        req.body
    );
    return res.status(200).json({
        status: 200,
        updated,
    });
});
// pending
// end: user authentication

// --

// begin: referrals
app.get("/get-user-uplink/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res
            .status(200)
            .json(await (0, getUserUplink.default)(req.params.user_id));
    });
});
// pending

app.get("/get-user-downlinks/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            downlinks: await (0, getUserDownlinks.default)(req.params.user_id),
        });
    });
});
// pending
// end: referrals

// --
app.get('/get-users', async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.redirect('/users');
    });
});

app.get("/users", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            users: await (await users()).find().exec(),
        });
    });
});
// completed

// --

// begin: coupon code management
app.post("/generate-coupon-code/:seed_amount", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        const seed_amount = Number(req.params.seed_amount);

        if (isNaN(seed_amount)) {
            seed_amount = Number(Object.keys(User.UserTierCommisions)[0]);
        }

        return res.status(200).json({
            status: 200,
            couponCode: await generateCouponCode(seed_amount),
        });
    });
});
// completed
// end: coupon code management

// --

// begin: endpoints for crediting and debiting user's account
app.post("/credit-rsm-points/:user_id", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// pending

app.post("/debit-rsm-points/:user_id", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// pending

app.post("/credit-referral-balance/:user_id", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// pending

app.post("/debit-referral-balance/:user_id", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// pending
// end: endpoints for crediting and debiting user's account

// --

// get comission ratio for referral
app.get("/commission-ratio", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        res.header("Cache-COntrol", "stale-if-error");
        res.status(200).json({
            ratios: User.UserTierCommisions,
        });
    })
);
// completed

// --

// handle 404 routes
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
// completed

// --

app.listen(PORT, async () => {
    console.clear();
    console.log(SERVER_RUNNING_MESSAGE);
    console.timeEnd(TIME_LABEL);
});
