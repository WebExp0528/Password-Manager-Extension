import Cryptr from "cryptr";
import { logger } from "../util/logger";

export const encrypt = (val, key = null) => {
    if (!val) return val;
    const cryptr = new Cryptr(key ? key : process.env.ENCRYPTION_KEY);
    try {
        return cryptr.encrypt(val);
    } catch (err) {
        logger.error({ msg: "encrypt err", err });
    }
    return val;
};
export const decrypt = (val, key = null) => {
    if (!val) return val;
    let cryptr = new Cryptr(key ? key : process.env.ENCRYPTION_KEY);
    try {
        return cryptr.decrypt(val);
    } catch (err) {
        logger.error({ msg: "decrypt err", val, err });
    }
    return val;
};
