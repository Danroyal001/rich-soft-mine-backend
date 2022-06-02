"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule
            ? mod
            : {
                default: mod,
            };
    };
Object.defineProperty(exports, "__esModule", {
    value: true,
});
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const updateUser_1 = __importDefault(require("./db/functions/updateUser"));
const getUserByID_1 = __importDefault(require("./db/functions/getUserByID"));
const User_1 = require("./db/Schemas/User");
const requestKit_1 = __importDefault(require("./util/requestKit"));
const getUserUplink_1 = __importDefault(
    require("./db/functions/getUserUplink")
);
const getUserDownlinks_1 = __importDefault(
    require("./db/functions/getUserDownlinks")
);
const generateBearerToken_1 = __importDefault(
    require("./db/functions/generateBearerToken")
);
const getCurrentUser_1 = __importDefault(
    require("./util/authUtil/getCurrentUser")
);
const cors_1 = __importDefault(require("cors"));
const authenticate_1 = __importDefault(require("./db/functions/authenticate"));
const TIME_LABEL = "Server startup time";
console.time(TIME_LABEL);
const PORT = Number(process.env.PORT) || 8080;
const app = (0, express_1.default)();
const SERVER_RUNNING_MESSAGE = `Server is running at http://127.0.0.1:${PORT}`;
app.use(
    express_1.default.urlencoded({
        extended: false,
    })
);
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// --
app.use((req, _, next) => {
    console.log(
        `\nRequest event received for url "${req.url
        }" with method "${req.method.toUpperCase()}" at time "${new Date()}"\n`
    );
    return next();
});
app.get("/", (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, () => {
        return res.send(SERVER_RUNNING_MESSAGE);
    })
);
// --
app.get("/test-db-connection", async (_, res) => {
    const conn = await (0, dbConnection_1.default)();
    return res.status(200).json({
        status: 200,
        db: conn.db.databaseName,
    });
});
// --
// begin: user authentication
app.post("/login", async (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        const { email, password } = req.body;
        const user = await (0, authenticate_1.default)(email, password);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User does not exist!",
            });
        }
        const token = await (0, generateBearerToken_1.default)(email, password);
        return res.status(200).json({
            status: 200,
            token,
            user,
        });
    })
);
app.post("/register", async (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// end: user authentication
// --
// begin: user mamanagement
app.get("/current-user", async (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        const currentUser = await (0, getCurrentUser_1.default)(req);
        return res.status(200).json({
            status: 200,
            user: currentUser,
        });
    })
);
app.post("/register", async (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        //
    })
);
app.post("/update-user/:user_id", async (req, res) => {
    const updated = (0, updateUser_1.default)(
        await (0, getUserByID_1.default)(req.params.user_id),
        req.body
    );
    return res.status(200).json({
        status: 200,
        updated,
    });
});
// end: user management
// --
// begin: referrals
app.get("/get-user-uplink/:user_id", async (req, res, next) => {
    return requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        return res
            .status(200)
            .json(await (0, getUserUplink_1.default)(req.params.user_id));
    });
});
app.get("/get-user-downlinks/:user_id", async (req, res, next) => {
    return requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            downlinks: await (0, getUserDownlinks_1.default)(req.params.user_id),
        });
    });
});
// end: referrals
// --
app.get("/commission-ratio", async (req, res, next) =>
    requestKit_1.default.handleRequestSafely(req, res, next, async () => {
        res.header("Cache-COntrol", "stale-if-error");
        res.status(200).json({
            ratios: User_1.UserTierCommisions,
        });
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
app.listen(PORT, async () => {
    console.clear();
    console.log(SERVER_RUNNING_MESSAGE);
    console.timeEnd(TIME_LABEL);
});
