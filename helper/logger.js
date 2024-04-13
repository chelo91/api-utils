import winston from 'winston'
import { env } from '../config/const.config.js'
import { LogsService } from '../services/index.js';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

let consoleLogLevel = 'debug';
if (env === 'production') {
    consoleLogLevel = 'info';
}

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: consoleLogLevel }),
    ]
});

export const requestLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${new Date().toLocaleTimeString()} - REQ ${req.ip} / [${req.method}]  / ${req.url}`)
    next()
}

export const respondLogger = async (res, type, status, message) => {
    const req = res.req;
    const log = `${new Date().toLocaleTimeString()} - RES ${req.ip} / ${status} / ${message}`;
    if (type === 'error') {
        await LogsService.create({
            request: {
                url: req.url,
                method: req.method,
                locals: req.app.locals
            },
            response: {
                status: status,
                message: message
            },
            user: req.app.locals.user._id
        })

        logger.error(log)
    } else {
        logger.info(log)
    }
}