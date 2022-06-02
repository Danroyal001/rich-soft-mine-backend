import express from "express";
import "dotenv/config";
import dbConnection from "./db/dbConnection";
import updateUser from "./db/functions/updateUser";
import getUserByID from "./db/functions/getUserByID";
import { UserTierCommisions } from "./db/Schemas/User";
import requestKit from "./util/requestKit";
import getUserUplink from "./db/functions/getUserUplink";
import getUserDownlinks from "./db/functions/getUserDownlinks";
import generateBearerToken from "./db/functions/generateBearerToken";
import getCurrentUser from "./util/authUtil/getCurrentUser";
import cors from "cors";
import authenticate from "./db/functions/authenticate";


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
app.use(cors());

// --

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
        status: 200,
        db: conn.db.databaseName,
    });
});

// --

app.post("/generate-bearer-token", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        const { email, password } = JSON.parse(req.body);

        const token = generateBearerToken(email, password);

        return res.status(200).json({
            status: 200,
            token,
        });
    })
);

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

        const token = await generateBearerToken(email, password);

        return res.status(200).json({
            status: 200,
            token,
            user,
        });
    })
);

app.post("/register", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);
// end: user authentication

// --

// begin: user mamanagement
app.get("/current-user", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        const currentUser = await getCurrentUser(req);

        return res.status(200).json({
            status: 200,
            user: currentUser,
        });
    })
);

app.post("/register", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        //
    })
);

app.post("/update-user/:user_id", async (req, res) => {
    const updated = updateUser(
        (await getUserByID(req.params.user_id))!,
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
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json(await getUserUplink(req.params.user_id));
    });
});

app.get("/get-user-downlinks/:user_id", async (req, res, next) => {
    return requestKit.handleRequestSafely(req, res, next, async () => {
        return res.status(200).json({
            downlinks: await getUserDownlinks(req.params.user_id),
        });
    });
});
// end: referrals

// --

app.get("/commission-ratio", async (req, res, next) =>
    requestKit.handleRequestSafely(req, res, next, async () => {
        res.header("Cache-COntrol", "stale-if-error");

        res.status(200).json({
            ratios: UserTierCommisions,
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
