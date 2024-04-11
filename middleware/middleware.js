import bcrypt from "bcryptjs";
import { UsersService } from "../services/index.js";
import { resNoAuth, resError } from "../helper/response.js";
import formidable from "formidable";

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
}

const checkResource = (arrayNames) => async (req, res, next) => {
    if (!arrayNames) {
        return resError(res, "Bad resource");
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
}

export {
    auth,
    checkResource,
}