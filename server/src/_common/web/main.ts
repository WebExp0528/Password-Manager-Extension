import express from "express";
import expressPinoLogger from "express-pino-logger";
import { loggerExpress, logger } from "../util/logger";
import routes from "./routes";
import fs from "fs";
import https from "https";

const env = process.env.NODE_ENV || "dev";

let app = express();

app.use(expressPinoLogger({ logger: loggerExpress }));
app.use("/api", routes);

if (env === "dev") {
    //
} else {
    app.use("/dist", express.static("dist"));
}

app.use("*", (req, res) => {
    res.end("On2Air");
});

if (env === "production") {
    app.use("*", (req, res) => res.sendFile(`${__dirname}/index.html`));
} else {
    app.use("*", (req, res) => res.sendFile(`${__dirname}/dist/index.html`));
}

loggerExpress.info("~~~~ Checking ssl files ~~~~");
if (
    false &&
    env === "production" && //no longer needed
    fs.existsSync(__dirname + "/../auth/ssl/server.key") &&
    fs.existsSync(__dirname + "/../auth/ssl/server.crt")
) {
    loggerExpress.info("~~~~ SSL SERVER ~~~~");
    let privateKey = fs.readFileSync(
        __dirname + "/../auth/ssl/server.key",
        "utf8"
    );
    let certificate = fs.readFileSync(
        __dirname + "/../auth/ssl/server.crt",
        "utf8"
    );

    let credentials = { key: privateKey, cert: certificate };
    app = https.createServer(credentials, app) as any;
} else {
    loggerExpress.info({ msg: "~~~~ HTTP SERVER ~~~~" });
}

// your express configuration here
app.listen(process.env.PORT, async () => {
    loggerExpress.info(
        `Server listening on port ${process.env.PORT} and environment ${env}`
    );
});
export default app;
