import express from "express";
import { sendMail } from '../controller/mails.controller.js';

export const router = express.Router();

router.get('/', sendMail);