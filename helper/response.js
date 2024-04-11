// helper.js

const resOk = (res, payload = {}) => {
    const response = {
        success: true,
        message: "OK",
        data: payload
    };
    res.status(200).json(response);
};

const resError = (res, error = {}, code = 400) => {
    const response = {
        success: false,
        message: "Error",
        error: error
    };
    res.status(code).json(response);
};

const resNoAuth = (res, message = "User unauthorized") => {
    const response = {
        success: false,
        message: message
    };
    res.status(401).json(response);
};


export {
    resOk,
    resError,
    resNoAuth
};