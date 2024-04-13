import { respondLogger } from './logger.js';

const resOk = (res, payload = {}, headers = {}) => {
    const response = {
        success: true,
        message: "OK",
        data: payload,
        headers: headers
    };
    respondLogger(res, 'info', 200, "OK");
    res.status(200).json(response);
};
const resError = (res, error = {}, code = 400) => {
    const response = {
        success: false,
        message: "Error",
        error: error
    };
    respondLogger(res, 'error', code, error);

    res.status(code).json(response);
};
const resNoAuth = (res, message = "User unauthorized") => {
    const response = {
        success: false,
        message: message
    };
    respondLogger(res, 'error', code, message);
    res.status(401).json(response);
};

export {
    resOk,
    resError,
    resNoAuth
};