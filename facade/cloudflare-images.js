import axios from 'axios';
import { cloudflareUrl, cloudflareKey } from '../config/const.config.js';

const listImage = async (page, perPage = 50) => {
    try {
        const res = await axios.get(cloudflareUrl + `?page=${page}&per_page=${perPage}`, {
            headers: {
                Authorization: "Bearer " + cloudflareKey
            }
        });
        return res;
    }
    catch (error) {
        throw error;
    }
};

const uploadImage = async (formData) => {
    try {
        const res = await axios.post(
            cloudflareUrl,
            formData,
            {
                headers:
                {
                    ...formData.getHeaders(),
                    Authorization: "Bearer " + cloudflareKey,
                    "Content-Type": "multipart/form-data"
                }
            });
        return res;
    } catch (error) {
        throw error;
    }
};

const uploadImageUrl = async (formData) => {
    try {
        const res = await axios.post(
            cloudflareUrl,
            formData,
            {
                headers:
                {
                    Authorization: "Bearer " + cloudflareKey,
                    "Content-Type": "multipart/form-data"
                }
            });
        return res;
    } catch (error) {
        throw error;
    }
};
/*
const DeleteImage = (async (id) => {
    try {
        const res = await axios.delete(URL + `/${id}`, {
            headers: {
                Authorization: "Bearer " + process.env.CF_TOKEN
            }
        });
        return res;
    }
    catch (error) {
        return error;
    }
});*/
 
export {
    listImage,
    uploadImage,
    uploadImageUrl,
    //DeleteImage,
};