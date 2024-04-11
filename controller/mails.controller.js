// mails.controller.js

/*
const api = require('../facade/images.model');
const helper = require('../helper/helper');
const formidable = require("formidable");
const fs = require("fs");
var FormData = require("form-data");

const UploadFile = (async (req, res) => {
    if (helper.CheckAuth(req, res)) {
        // We're using formidable to capture our form contents
        const form = new formidable.IncomingForm();
        // We'll parse the contents of the form that gets sent to our endpoint
        form.parse(req, async function (err, fields, files) {

            if (helper.CheckResource(files, res)) {
                // We'll expect a file called myFile and create a readable stream from its temporary path.clea
                // myFile will be the picture we want to upload
                let image = fs.createReadStream(files.img.filepath);

                //We'll create a new form to send to Cloudflare Images and append our newly processed image
                var data = new FormData();

                data.append("file", image, fields.name);

                // Finally, we'll use axios to make a POST request to Cloudflare Images
                const ret = await api.UploadImage(data);
                
                if (ret.data != undefined && ret.data.success != undefined && ret.data.success) {
                    helper.ResOk(res, ret.data.result);
                } else {
                    helper.ResError(res, ret);
                }
            }
        });
    }
});
const UploadUrl = (async (req, res) => {
    if (helper.CheckAuth(req, res)) {

        const axios = require("axios");
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {

            if (helper.CheckResource(fields, res)) {
                await axios.get(fields.img, { responseType: 'stream' })
                    .then(async function (response) {
                        var data = new FormData();
                        data.append("file", response.data, fields.name);
                        const ret = await api.UploadImage(data);
                        if (ret.data != undefined && ret.data.success != undefined && ret.data.success) {
                            helper.ResOk(res, ret.data.result);
                        } else {
                            helper.ResError(res, ret);
                        }

                    }).catch(error => {
                        helper.ResError(res, error);
                    });
            }
        });
    }
});
const UploadBase64 = (async (req, res) => {
    if (helper.CheckAuth(req, res)) {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (helper.CheckResource(fields, res)) {

                var decodedFile = Buffer.from(fields.img, 'base64');
                let image = decodedFile;
                var data = new FormData();
                data.append("file", image, fields.name);

                const ret = await api.UploadImage(data);
                if (ret.data != undefined && ret.data.success != undefined && ret.data.success) {
                    helper.ResOk(res, ret.data.result);
                } else {
                    helper.ResError(res, ret);
                }
            }
        });
    }
});

const GetPage = (async (req, res) => {
    if (helper.CheckAuth(req, res)) {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (helper.CheckResource(fields, res, "page")) {
                const ret = await api.ListImage(fields.page, fields.perPage);
                
                if (ret.data != undefined && ret.data.success != undefined && ret.data.success) {
                    helper.ResOk(res, ret.data.result);
                } else {
                    helper.ResError(res, ret);
                }
            }
        });
    }
});
const DeleteImage = (async (req, res) => {
    if (helper.CheckAuth(req, res)) {
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            if (helper.CheckResource(fields, res)) {
                const urlImg = new URL(fields.img);
                const splitUrlImg = urlImg.pathname.split('/')
                const ret = await api.DeleteImage(splitUrlImg[2]);

                if (ret.data != undefined && ret.data.success != undefined && ret.data.success) {
                    helper.ResOk(res, ret.data.result);
                } else {
                    helper.ResError(res, ret);
                }
            }
        });
    }
});

const Test = (async (req, res) => {
    helper.ResOk(res);
})

/////////////////////////////////////////////////

module.exports = {
    UploadFile,
    UploadUrl,
    UploadBase64,
    DeleteImage,
    GetPage,
    Test
}
*/