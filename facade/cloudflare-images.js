import axios from 'axios';
import { cloudflareUrl, cloudflareToken } from '../config/const.config.js';

const listImage = async (page, perPage = 50) => {
    try {
        const res = await axios.get(cloudflareUrl + `?page=${page}&per_page=${perPage}`, {
            headers: {
                Authorization: "Bearer " + cloudflareToken
            }
        });
        return res;
    }
    catch (error) {
        throw error;
    }
};

const uploadImage = async (formData) => {

    const res = await axios({
        method: "post",
        url: cloudflareUrl,
        headers: {
            ...formData.getHeaders(),
            Authorization: "Bearer " + cloudflareToken,
            "Content-Type": "multipart/form-data"
        },
        data: formData
    }).then(result => {
        return result;
    }).catch(error => {
        console.error(error);
        throw error;
    });
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
});

const Test = (async () => {
    return {
        'response': "HI"
    };
});*/

export {
    listImage,
    uploadImage,
    //DeleteImage,
    //Test
};