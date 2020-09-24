import express from "express";
import _ from "lodash";
import pino from "pino";
import { logger } from "../util/logger";

export default class Controller {
    public logger: pino.Logger;

    constructor() {
        this.logger = logger;
    }

    perPage(req: express.Request | any, defaultVal: number = 50) {
        return req.query["perPage"] || defaultVal;
    }

    pageNum(req: express.Request | any, defaultVal: number = 1) {
        return req.query["page"] || defaultVal;
    }

    pageContext(req: express.Request | any, defaultVal: boolean = false) {
        return (
            !!_.toString(req.query["context"]) ||
            (req.query["context"] === null && defaultVal)
        );
    }

    order(req: express.Request | any, defaultVal: object | string = []) {
        let order = req.query["order"];
        if (order) {
            try {
                order = JSON.parse(order);
            } catch (err) {
                //order must not be json
                let [key, dir = "asc"] = order.split(":");
                order = [{ column: key, order: dir }];
            }
        } else if (_.size(defaultVal)) {
            order = defaultVal;
        } else {
            order = [{ column: "id", order: "desc" }];
        }

        return order;
    }

    log = (...args) => {
        this.logger.info({ ...args });
    };
    error = (msg, err) => {
        this.logger.error({ msg, err });
    };
}
