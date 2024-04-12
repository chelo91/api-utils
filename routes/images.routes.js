import express from "express";
import { checkResource, checkImage, checkFile } from "../middleware/middleware.js";
import { getPage, uploadBase64, uploadUrl, uploadFile } from "../controller/images.controller.js";

export const router = express.Router();

router.get("/", getPage);

router.post("/base64",
    checkResource(["image", "name"]),
    uploadBase64);

router.post("/url",
    checkResource(["image", "name"]),
    checkImage(["image"]),
    uploadUrl);

router.post("/file",
    checkResource(["image", "name"]),
    checkFile(["image"]),
    uploadFile);
/*
router.post("/url", async (req, res) => {

});
router.post("/file", async (req, res) => {

});
router.delete("/:id", async (req, res) => {

});*/