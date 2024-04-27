import bcrypt from "bcryptjs";
import formidable from "formidable";
import axios from 'axios';
import fs from "fs";
import path from 'path';

import { UsersService } from "../services/index.js";
import { resNoAuth, resError } from "../helper/response.js";
const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

const auth = async (req, res, next) => {
    try {
        const user = await UsersService.readOne({ ip: req.ip });
        if (user) {
            let token = req.headers.authorization;
            token = token.split(' ')[1];
            if (!bcrypt.compareSync(token, user.token)) {
                return resNoAuth(res);
            } else {
                req.app.locals.user = user;
            }
        } else {
            return resNoAuth(res);
        }
    } catch (error) {
        return resError(res, error.message);
    }
    next();
};

const loadFieldsAndFiles = (arrayFieldsNames = [], arrayFilesNames = []) => async (req, res, next) => {
    try {
        // Verificar si los parámetros de entrada son realmente arrays
        if (!Array.isArray(arrayFieldsNames) || !Array.isArray(arrayFilesNames)) {
            return resError(res, 'Array expected for fields and files names');
        }

        // Manejar diferentes tipos de solicitudes
        if (req.is("multipart/form-data") || req.is("application/x-www-form-urlencoded")) {
            const form = formidable({});
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return resError(res, "Error parsing form");
                }
                // Verificar la presencia de campos requeridos
                for (let name of arrayFieldsNames) {
                    if (!fields[name]) {
                        return resError(res, `Field '${name}' not found`);
                    }
                    req.app.locals[name] = fields[name].toString();
                }
                // Verificar la presencia de archivos requeridos
                for (let name of arrayFilesNames) {
                    if (!files[name]) {
                        return resError(res, `File '${name}' not found`);
                    }
                    req.app.locals[name] = files[name][0];
                }
                next();
            });
       /* } else if (req.is('application/json')) {
            // Verificar la presencia de campos requeridos en la solicitud JSON
            for (let name of arrayFieldsNames) {
                if (req.body[name] === undefined) {
                    return res.status(400).json({ error: `Field '${name}' not found in JSON body` });
                }
                req.app.locals[name] = req.body[name];
            }
            next();
        */} else {
            return resError(res, "Unsupported Content-Type");
        }
    } catch (error) {
        return resError(res, error.message);
    }
};

const checkImageUrl = (arrayNames) => async (req, res, next) => {
    try {
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
        return resError(res, error.message);
    }
};
const checkImageBase64 = (arrayNames) => async (req, res, next) => {
    try {
        if (!Array.isArray(arrayNames)) {
            arrayNames = [arrayNames];
        }
        for (let name of arrayNames) {
            const base64String = req.app.locals[name];
            const base64Image = base64String.split(';base64,').pop();
            const imageBuffer = Buffer.from(base64Image, 'base64');
            if (!imageBuffer.toString('base64') === base64Image) {
                return resError(res, `Field '${name}' is not a valid base64 image`);
            }
            req.app.locals[name] = imageBuffer;
        }
        next();
    } catch (error) {
        return resError(res, error.message);
    }
};
const checkImageFile = (arrayNames) => async (req, res, next) => {
    try {
        if (!Array.isArray(arrayNames)) {
            arrayNames = [arrayNames];
        }
        for (let name of arrayNames) {
            const fileExtension = path.extname(req.app.locals[name].originalFilename).toLowerCase();
            if (!validImageExtensions.includes(fileExtension)) {
                return resError(res, `File '${name}' is not an image`);
            }
            req.app.locals[name] = fs.createReadStream(req.app.locals[name].filepath);
        }
        next();
    } catch (error) {
        return resError(res, error.message);
    }
};


export {
    auth,
    loadFieldsAndFiles,
    checkImageUrl,
    checkImageFile,
    checkImageBase64
}