import express from "express";
import { getListsByUser, createList, getListById } from "../controllers/lists.controller.js";

export const router = express.Router();

router.get('/', getListsByUser);
router.post('/', createList);
router.get('/:lid', getListById);