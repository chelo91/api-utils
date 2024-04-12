import bcrypt from "bcryptjs";
import formidable from "formidable";
import axios from 'axios';
import fs from "fs";

import { UsersService } from "../services/index.js";
import { resNoAuth, resError, resErrorException } from "../helper/response.js";

const auth = async (req, res, next) => {
    const user = await UsersService.readOne({ ip: req.ip });
    if (user) {
        let token = req.headers.authorization;
        token = token.split(' ')[1];
        if (!bcrypt.compareSync(token, user.token)) {
            return resNoAuth(res);
        }
    } else {
        return resNoAuth(res);
    }
    next();
};

const checkImage = (arrayNames) => async (req, res, next) => {
    try {
        if (!arrayNames) {
            next();
        }
        if (!Array.isArray(arrayNames)) {
            arrayNames = [arrayNames];
        }
        for (let name of arrayNames) {
            const response = await axios.get(req.app.locals[name], { responseType: 'stream' });
            if (!response.headers['content-type'].startsWith('image/')) {
                return resError(res, "Resource is not an image");
            } else {
                req.app.locals[name] = response.data;
            }
        }
        next();
    } catch (error) {
        return resErrorException(res, error);
    }
};

const checkResource = ([arrayFieldsNames], [arrayFilesNames]) => async (req, res, next) => {
    try {
        if (!arrayNames) {
            next();
        }
        if (!Array.isArray(arrayNames)) {
            arrayNames = [arrayNames];
        }
        if (req.is("multipart/form-data") || req.is("application/x-www-form-urlencoded")) {
            const form = formidable({});
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return resError(res, "Error parsing form");
                }
                // Verificar si el campo deseado está presente en los campos analizados
                for (let name of arrayNames) {
                    if (!fields[name]) {
                        return resError(res, "Bad resource");
                    }
                    req.app.locals[name] = fields[name].toString();
                }
                next();
            });
        } else if (req.is('application/json')) {
            for (let name of arrayNames) {
                if (req.body[name] !== undefined) {
                    req.app.locals[name] = req.body[name];
                } else {
                    return resError(res, "Bad resource");
                }
            }
            next();
        } else {
            return resError(res, "Bad resource");
        }
    } catch (error) {
        return resErrorException(res, error);
    }
};

const checkFile = (arrayNames) => async (req, res, next) => {
    try {
        if (!arrayNames) {
            next();
        }
        if (!Array.isArray(arrayNames)) {
            arrayNames = [arrayNames];
        }

        if (req.is("multipart/form-data") || req.is("application/x-www-form-urlencoded")) {
            const form = formidable({});
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return resError(res, "Error parsing form");
                }
                // Verificar si el campo deseado está presente en los campos analizados
                for (let name of arrayNames) {
                    if (!files[name]) {
                        return resError(res, "Bad resource");
                    }
                    req.app.locals[name] = fs.createReadStream(files.img.filepath);
                }
                next();
            });
        }
    } catch (error) {
        return resErrorException(res, error);
    }
};

export {
    auth,
    checkResource,
    checkImage,
    checkFile
}