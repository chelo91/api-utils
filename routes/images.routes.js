import express from "express";
import { loadFieldsAndFiles, checkImageUrl, checkImageFile, checkImageBase64 } from "../middleware/middleware.js";
import { getPage, submitImage } from "../controller/images.controller.js";

export const router = express.Router();

router.get("/", getPage);

router.post("/base64",
    loadFieldsAndFiles(["image", "name"]),
    checkImageBase64(["image"]),
    submitImage);

router.post("/url",
    loadFieldsAndFiles(["image", "name"]),
    checkImageUrl(["image"]),
    submitImage);

router.post("/file",
    loadFieldsAndFiles(["name"], ["image"]),
    checkImageFile(["image"]),
    submitImage);
/*
router.post("/url", async (req, res) => {

});
router.post("/file", async (req, res) => {

});
router.delete("/:id", async (req, res) => {

});*/