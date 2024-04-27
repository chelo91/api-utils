import express from 'express';
import cors from 'cors';
import { port } from './config/const.config.js';
import { auth } from './middleware/middleware.js';
import { router as imagesRouter } from './routes/images.routes.js';
import { router as mailsRouter } from './routes/mails.routes.js';
import { requestLogger } from './helper/logger.js';
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
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.send("api-utils is working")
});
app.use("/api/images", auth, imagesRouter);
app.use("/api/mail", auth, mailsRouter);

app.listen(port, () => {
    console.log(`API-Cloudflare-Images is working in port ${port}`)
})
