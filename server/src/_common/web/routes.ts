import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import routes from "../../controllers/";
import session from "express-session";
import cors from "cors";
import KnexSessionStore from "connect-session-knex";
import db from "../db";
import { logger } from "../util/logger";
const app: express.Express = express();

const env = process.env.NODE_ENV || "dev";
app.use(
    cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
app.use(
    bodyParser.json({
        verify: function (req, res, buf) {
            var url = req["originalUrl"];
            if (url.startsWith("/api/manager/stripe")) {
                req["rawBody"] = buf.toString();
            }
        },
    })
);
app.use(bodyParser.urlencoded({ extended: false }));

// initialize express-session to allow us track the logged-in user across sessions.
const store = new (KnexSessionStore(session))({
    knex: db,
    tablename: "users_sessions",
    sidfieldname: "sid",
});
app.use(
    session({
        key: "sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            // domain: env === 'production' ? 'dev-web.on2api.com' : 'localhost',
            // sameSite: 'none',
            httpOnly: true,
            secure: env !== "development",
            maxAge: 1000000000, // ten seconds, for testing
        },
        store: store,
    })
);
if (env === "production") app.set("trust proxy", 1);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (
        req["cookies"] &&
        req["cookies"]["sid"] &&
        (!req["session"] || !req["session"]["user"])
    ) {
        logger.info({ msg: "clearing sid cookie", cookies: req.cookies });
        res.clearCookie("sid");
    }
    next();
});

_.each(routes, (route, key) => {
    app.use(`/${key}`, route);
    if (env === "dev") {
    }
});

export default app;
