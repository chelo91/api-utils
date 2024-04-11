// helper.js

const resOk = (res, payload = {}, headers = {}) => {
    const response = {
        success: true,
        message: "OK",
        data: payload,
        headers: headers
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
const resErrorException = (res, error = {}, code = 400) => {
    const response = {
        success: false,
        message: "Error",
        error: { code: error.code, message: error.message }
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
    resErrorException,
    resNoAuth
};