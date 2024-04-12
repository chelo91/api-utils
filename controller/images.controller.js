import { resOk, resError, resErrorException } from '../helper/response.js';
import fs from "fs";
import FormData from "form-data";
import { listImage, uploadImage } from '../facade/cloudflare-images.js';

const getPage = async (req, res) => {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    try {
        const ret = await listImage(page, perPage);
        if (ret.data?.success) {
            return resOk(res, ret.data.result);
        } else {
            return resError(res, ret);
        }
    } catch (error) {
        return resErrorException(res, error);
    }
};
const uploadBase64 = async (req, res) => {
    const { image, name } = req.app.locals;
    try {
        // Assuming `image` is in base64 format
        const decodedImage = Buffer.from(image, 'base64');
        // Create a new FormData object
        const formData = new FormData();
        // Append the image data to the FormData object with the correct field name
        formData.append('file', decodedImage, name);

        const ret = await uploadImage(formData);
        if (ret.data?.success) {
            return resOk(res, ret.data.result);
        } else {
            return resError(res, ret);
        }
    } catch (error) {
        return resErrorException(res, error);
    }
};
const uploadUrl = async (req, res) => {
    const { image, name } = req.app.locals;
    try {
        const formData = new FormData();
        formData.append("file", image, name);
        const ret = await uploadImage(formData);
        if (ret.data?.success) {
            return resOk(res, ret.data.result);
        } else {
            return resError(res, ret);
        }
    } catch (error) {
        return resErrorException(res, error);
    }
};
const uploadFile = async (req, res) => {
    const { image, name } = req.app.locals;
    try {
        const formData = new FormData();
        formData.append("file", image, name);
        const ret = await uploadImage(formData);
        if (ret.data?.success) {
            helper.resOk(res, ret.data.result);
        } else {
            helper.resError(res, ret);
        }
    } catch (error) {
        helper.resError(res, error);
    }
};


/*
const UploadFile = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (helper.CheckResource(files, res)) {
            let image = fs.createReadStream(files.img.filepath);
            var data = new FormData();
            data.append("file", image, fields.name);
            try {
                const ret = await api.UploadImage(data);
                if (ret.data?.success) {
                    helper.resOk(res, ret.data.result);
                } else {
                    helper.resError(res, ret);
                }
            } catch (error) {
                helper.resError(res, error);
            }
        }
    });
};

const UploadUrl = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (helper.CheckResource(fields, res)) {
            try {
                const response = await axios.get(fields.img, { responseType: 'stream' });
                var data = new FormData();
                data.append("file", response.data, fields.name);
                const ret = await api.UploadImage(data);
                if (ret.data?.success) {
                    helper.resOk(res, ret.data.result);
                } else {
                    helper.resError(res, ret);
                }
            } catch (error) {
                helper.resError(res, error);
            }
        }
    });
};
*/
/*
const DeleteImage = async (req, res) => {
    if (helper.CheckAuth(req, res)) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (helper.CheckResource(fields, res)) {
                try {
                    const urlImg = new URL(fields.img);
                    const splitUrlImg = urlImg.pathname.split('/')
                    const ret = await api.DeleteImage(splitUrlImg[2]);
                    if (ret.data?.success) {
                        helper.resOk(res, ret.data.result);
                    } else {
                        helper.resError(res, ret);
                    }
                } catch (error) {
                    helper.resError(res, error);
                }
            }
        });
    }
};
*/
export {
    getPage,
    uploadBase64,
    uploadUrl,
    uploadFile
};
