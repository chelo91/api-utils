import { persistence, mongoUrl, mongoDBName } from "../config/const.config.js";
import mongoose from "mongoose";

export let Users
export let Images
export let Mails
export let Logs

switch (persistence) {
    case "MONGO":
        try {
            await mongoose.connect(mongoUrl, { dbName: mongoDBName })
            console.log('DB connected 👌')
            const { default: UsersMongo } = await import('./mongo/users.mongo.js')
            const { default: ImagesMongo } = await import('./mongo/images.mongo.js')
            const { default: MailsMongo } = await import('./mongo/mails.mongo.js')
            const { default: LogsMongo } = await import('./mongo/logs.mongo.js')

            Users = UsersMongo
            Images = ImagesMongo
            Mails = MailsMongo
            Logs = LogsMongo

        } catch (error) {
            process.exit(1);
        }
        break;
    default:
        throw "Persistence doesn't found"
}