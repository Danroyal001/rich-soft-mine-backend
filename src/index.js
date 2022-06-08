"use strict";

const express = require("express");
require("dotenv/config");
const dbConnection = require("./db/dbConnection");
const updateUser = require("./db/functions/updateUser");

const {
    default: getUsers
} = require("./db/functions/getUsers");
const User = require("./db/Schemas/User");
const requestKit = require("./util/requestKit");
const getUserDownlinks =
    require("./db/functions/getUserDownlinks");
const generateBearerToken =
    require("./db/functions/generateBearerToken");
const getCurrentUser =
    require("./util/authUtil/getCurrentUser");


const cors = require("cors");
const authenticate = require("./db/functions/authenticate");
const mongoose = require('mongoose');

const {
    default: createUser
} = require("./db/functions/createUser");
const { default: generateCouponCode } = require("./db/functions/generateCouponCode");
const TIME_LABEL = "Server startup time";

const PORT = Number(process.env.PORT) || 8080;

const ObjectId = mongoose.Schema.Types.ObjectId;

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
    requestKit.default.handleRequestSafely(req, res, next, () => {
        return res.send(SERVER_RUNNING_MESSAGE);
    })
);
// completed

// --

app.get("/test-db-connection", async (_, res) => {
    const {
        db: {
            databaseName
        }
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
    requestKit.default.handleRequestSafely(req, res, next, async () => {
        const {
            email,
            password
        } = req.body;

        const user = await authenticate.default(email, password);

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User does not exist!",
            });
        }
        const token = await (0, generateBearerToken.default)(email, password);
        return res.status(200).json({
            status: 200,
            token,
            user,
        });
    }));
// completed

app.post("/register", async (req, res, next) =>
    requestKit.default.handleRequestSafely(req, res, next, async () => {
        const user = await createUser(req.body);
        return res.status(200).json({
            status: 200,
            user,
        });
    }));

app.get("/current-user", async (req, res, next) =>
    requestKit.default.handleRequestSafely(req, res, next, async () => {
        const currentUser = await (0, getCurrentUser.default)(req);
        return res.status(200).json({
            status: 200,
            user: currentUser,
        });
    }));

app.post("/register/:uplink_id", async (req, res, next) =>
    requestKit.default.handleRequestSafely(req, res, next, async () => {
        //
    }));

app.post("/update-user/:user_id", async (req, res) => {
    const updated = (0, updateUser.default)(
        (await getUsers.default({
            _id: new ObjectId(req.params.user_id)
        }))[0],
        req.body
    );
    return res.status(200).json({
        status: 200,
        updated,
    });
});
// end: user authentication

// --

// begin: referrals
app.get("/get-user-uplink/:user_id", async (req, res, next) => {
    return requestKit.default.handleRequestSafely(req, res, next, async () => {
        return res
            .status(200)
            .json(await (0, getUserUplink.default)(req.params.user_id));
    });
});

app.get("/get-user-downlinks/:user_id", async (req, res, next) => {
    return requestKit.default.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            downlinks: await (0, getUserDownlinks.default)(req.params.user_id),
        });
    });
});
// end: referrals

// --

// begin: coupon code management
app.get("/generate-coupon-code/:seed_amount", async (req, res, next) => {
    return requestKit.default.handleRequestSafely(req, res, next, async () => {
        const seed_amount = Number(req.params.seed_amount);

        if (isNaN(seed_amount)) {
            seed_amount = Number(Object.keys(User.UserTierCommisions)[0]);
        };

        return res.status(200).json({
            status: 200,
            couponCode: await generateCouponCode(seed_amount),
        });
    });
});
// end: coupon code management

// --

// get comission ratio for referral
app.get("/commission-ratio", async (req, res, next) =>
    requestKit.default.handleRequestSafely(req, res, next, async () => {
        res.header("Cache-COntrol", "stale-if-error");
        res.status(200).json({
            ratios: User.UserTierCommisions,
        });
    }));

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

// --

app.listen(PORT, async () => {
    console.clear();
    console.log(SERVER_RUNNING_MESSAGE);
    console.timeEnd(TIME_LABEL);
});
