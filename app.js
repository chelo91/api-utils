import express from 'express';
import cors from 'cors';
import { auth } from './middleware/middleware.js';
import { port } from './config/const.config.js';
import { router as imagesRouter } from './routes/images.routes.js';
const app = express();

const whitelist = ['http://localhost:3000']; // assuming front-end application is running on localhost port 3000
/*const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));*/
app.use(cors());
//app.use(logger('dev'));
app.use(express.json());
app.get("/", auth, (req, res) => {
    res.send("API-Cloudflare-Images is working")
});
app.use("/api/images", auth, imagesRouter);

app.listen(port, () => {
    console.log(`API-Cloudflare-Images is working in port ${port}`)
})


/*import controller from "./controller/controller";
const app = express();
app.use(logger('dev'));
const port = 3000;

require('dotenv').config();

app.get("/", controller.Test);
app.post("/UploadImgFile", controller.UploadFile);
app.post("/UploadImgBase64", controller.UploadBase64);
app.post("/UploadImgUrl", controller.UploadUrl);
app.get("/GetPage", controller.GetPage);
app.delete("/DeleteImg", controller.DeleteImage);

app.listen(port, () => {
    console.log(`API-Cloudflare-Images is working in port ${port}`)
})*/