import express from "express";
import { checkResource } from "../middleware/middleware.js";
import { getPage } from "../controller/images.controller.js";

export const router = express.Router();

router.get("/", getPage);

router.post("/base64", checkResource("img"), getPage);
/*
router.post("/url", async (req, res) => {

});
router.post("/file", async (req, res) => {

});
router.delete("/:id", async (req, res) => {

});*/