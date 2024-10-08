import express from 'express';
import cors from 'cors';
import { port, corsOrigin } from './config/const.config.js';
import { auth } from './middleware/middleware.js';
import { router as imagesRouter } from './routes/images.routes.js';
import { router as mailsRouter } from './routes/mails.routes.js';
import { requestLogger } from './helper/logger.js';
const app = express();

const whitelist = corsOrigin; // assuming front-end application is running on localhost port 3000
const corsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes sin 'origin' (como las locales o las de herramientas de desarrollo)
        if (!origin) return callback(null, true);

        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.send("api-utils is working")
});
app.get("/check", auth, (req, res) => {
    res.send("authorized")
});
app.use("/api/images", auth, imagesRouter);
app.use("/api/mail", auth, mailsRouter);

app.listen(port, () => {
    console.log(`api-utils is working in port ${port}`)
})
