import express from "express";
import { loadFieldsAndFiles } from '../middleware/middleware.js';
import { sendMail } from '../controller/mails.controller.js';

export const router = express.Router();

router.post('/',
    loadFieldsAndFiles(["subject", "body", "to"]),
    sendMail);