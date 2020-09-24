import express from "express";
import pg from "../db/";
import _ from "lodash";
import { logger } from "../util/logger";

import crypto from "crypto";

export const sendUnauthorized = (res: express.Response, message: string) => {
    return res.status(401).send({ message: message });
};

let checkAuthCode = async (
    req: express.Request | any,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.header("Authorization")) {
        return sendUnauthorized(res, "missing_authorization_header");
    }

    let authHeader = req.header("Authorization");
    let token = authHeader ? authHeader.split(" ")[1] : "";

    if (token) {
        const token_md5_key = crypto
            .createHash("md5")
            .update(token)
            .digest("hex");

        try {
            const apiKey = await pg("apikeys")
                .where("md5_key", token_md5_key)
                .first();

            if (apiKey) {
                const user = await pg("users").where("id", apiKey.user).first();

                if (user) {
                    user.active_account = apiKey.account;
                    req["user"] = user;
                    req["user_id"] = user.id;
                    req["account_id"] = apiKey.account;
                    req["apikey"] = apiKey;
                    next();
                } else {
                    return sendUnauthorized(res, "invalid_user");
                }
            } else {
                return sendUnauthorized(res, "invalid_api_key");
            }
        } catch (err) {
            return res
                .status(500)
                .json({
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: err.toString(),
                });
        }
    } else {
        return sendUnauthorized(res, "missing_token");
    }
};

let checkAuthenticated = async (
    req: express.Request | any,
    res: express.Response,
    next: express.NextFunction
) => {
    return checkAuthenticatedCookie(req, res, next);
    // return checkAuthenticatedToken(req,res,next)
};
let checkAuthenticatedCookie = async (
    req: express.Request | any,
    res: express.Response,
    next: express.NextFunction
) => {
    // logger.info('auth cookie', req.session, req.cookies)
    if (_.get(req, "session.user") && _.get(req, "sessionID")) {
        if (!_.get(req, "session.user.active_account"))
            req.session.user.active_account = _.get(
                req,
                "session.user.default_account"
            );
        req["user"] = req.session.user;
        req["user_id"] = req.session.user.id;
        req["account_id"] = req.session.user.active_account;
        next();
    } else if (_.get(req, "sessionID")) {
        return sendUnauthorized(res, "invalid_cookie");
    } else {
        return sendUnauthorized(res, "invalid_session");
    }
};

/**
 * Checks if the user role meets the minimum requirements of the route
 */
let hasRole = (roleRequired: string) => {
    // if (!roleRequired) throw new Error('Required role needs to be set');
    // return function(req:express.Request, res:express.Response, next:express.NextFunction) {
    //     // @ts-ignore
    //     if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
    //         next();
    //     } else {
    //         return res.sendStatus(403);
    //     }
    // }
};

/**
 * Checks if the user role meets the minimum requirements of the route, this function can be used anywhere
 */
let hasRoleSerial = (roleRequired: string, user: object) => {
    // if (!roleRequired || !user) return false;
    // // @ts-ignore
    // return config.userRoles.indexOf(user.role) >= config.userRoles.indexOf(roleRequired);
};

export default {
    checkAuthenticated,
    checkAuthCode,
    hasRole,
    hasRoleSerial,
};
