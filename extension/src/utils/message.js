import ext from "./ext";

/**
 * Types of message
 */
export const MSGType = {
    SIGN_IN: 100000,
    CHECK_AUTH: 100001
};

/**
 * Send Message to background script
 * @param {string} msgType
 * @param {object} message
 */
export const sendMessage = async (msgType, message) => {
    const msg = {
        msgType,
        ...message
    };

    return new Promise((resolve, reject) => {
        try {
            ext.runtime.sendMessage(msg, response => {
                resolve(response);
            });
        } catch (e) {
            console.log("ext.runtime.sendMessage failed => ", e);
            reject({ success: false, error: e });
        }
    });
};
