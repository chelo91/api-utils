import FormData from "form-data";
import { ImagesService } from '../services/index.js';
import { listImage, uploadImage } from '../facade/cloudflare-images.js';
import { resOk, resError } from '../helper/response.js';

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
        return resError(res, error.message);
    }
};
const submitImage = async (req, res) => {
    const { image, name, user } = req.app.locals;
    try {
        // Create a new FormData object
        const formData = new FormData();
        // Append the image data to the FormData object with the correct field name
        formData.append('file', image, name);
        const ret = await uploadImage(formData);
        if (ret.data?.success) {
            const image = ret.data.result;
            image.user = user._id;
            /*id: { type: String, required: true },
            filename: { type: String, required: true },
            uploaded: { type: Date, required: true },
            requireSignedURLs: { type: Boolean, required: true },
            variants: { type: [String], required: true },
            variants: { type: [String], required: true },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            }*/
            await ImagesService.create(image);
            return resOk(res, ret.data.result);
        } else {
            return resError(res, ret);
        }
    } catch (error) {
        return resError(res, error.message);
    }
};

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
    submitImage
};
