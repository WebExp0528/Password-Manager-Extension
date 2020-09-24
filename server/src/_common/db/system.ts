import pg from "./index";
import _ from "lodash";
import { logger } from "../util/logger";

export const toTrash = async (user: object, table: string, data: object) => {
    if (!data || !data["id"]) return;
    try {
        let user_id = user["id"];
        let account = user["active_account"];
        let reference = data["id"];
        await pg("trashbin").insert({
            user: user_id,
            account,
            reference,
            table,
            data,
        });
    } catch (err) {
        logger.error({ msg: `trashbin error ${err.message}`, err });
    }
};

export const toEvent = async (
    user: object,
    table: string,
    action: string,
    reference: number | null | object,
    data: object | null | any = null
) => {
    try {
        if (_.isObject(reference) && data === null) {
            data = reference;
            reference = null;
        }
        let user_id = user["id"];
        let account = user["active_account"];
        reference = reference || data["id"];

        //not implemented yet
        // await pg('events').insert({
        //     user: user_id,
        //     account,
        //     action,
        //     reference,
        //     table,
        //     data
        //
        // })
    } catch (err) {
        logger.error("events error", err);
    }
};

export const stringifyJsonArray = (
    data: object | any,
    arrayKeys: string | string[]
) => {
    arrayKeys = _.isString(arrayKeys) ? _.split(arrayKeys, ",") : arrayKeys;
    _.each(arrayKeys, (key) => {
        if (data[key] && _.isArray(data[key])) {
            data[key] = JSON.stringify(data[key]);
        }
    });
    return data;
};
