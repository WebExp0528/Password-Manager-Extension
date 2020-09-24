import pino, { BaseLogger } from "pino";
import _ from "lodash";
export const loggerExpress = pino({
    name: `passwordManager-${process.env.ENV || "localhost"}-${
        process.env.APP || "apps"
    }`,
    level: process.env.LOG_LEVEL || "info",
    // formatters: {
    //   log (message){
    //     if(_.isString(message))message = {msg:message}
    //     let tags = {}
    //     let {msg=''} = message as any
    //
    //     _.each(message, (val,key)=> {
    //         if(_.isPlainObject(val) || _.isArray(val))tags[key] = JSON.stringify(val)
    //         else if(!_.isObject(val) && key !== 'msg')tags[key] = val
    //     })
    //     return {msg,...(_.isEmpty(tags) ? {} : {tags})}
    //   }
    // },
    // base: null,
    timestamp: true,
    // Pino-pretty configuration
    prettyPrint: {
        colorize: true,
        crlf: false,
        errorLikeObjectKeys: ["err", "error"],
        errorProps: "",
        levelFirst: false,
        messageKey: "msg",
        timestampKey: "time",
        translateTime: "SYS:standard",
        // ignore: 'pid,hostname',
    },
});
function logMethod(args, method) {
    if (args.length === 2) {
        args[0] = `${args[0]} %j`;
    }
    method.apply(this, args);
}
export const logger = loggerExpress;

// export const logger = pino({
//   name: `on2air-${process.env.ENV || 'localhost'}-${process.env.APP || 'apps'}`,
//   level: process.env.LOG_LEVEL || 'debug',
//   timestamp: true,
//   hooks: { logMethod },
//   // Pino-pretty configuration
//   prettyPrint: process.env.NODE_ENV == 'development' ? {
//     colorize: true,
//     crlf: false,
//     errorLikeObjectKeys: ['err', 'error'],
//     errorProps: '',
//     levelFirst: false,
//     messageKey: 'msg',
//     timestampKey: 'time',
//     translateTime: 'SYS:standard',
//     // ignore: 'pid,hostname',
//   } : false,
// });
//
