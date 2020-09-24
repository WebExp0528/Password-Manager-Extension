/**
 * Wait for seconds
 * @param {number} seconds
 */
export const waitSeconds = async seconds => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
};
