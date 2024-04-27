import mongoose from 'mongoose'

const mailCollection = 'mails'
const mailSchema = new mongoose.Schema({

    subject: { type: String, required: true },
    body: { type: String, required: true },
    to: { type: String, required: true },
    sender: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

const mailModel = mongoose.model(mailCollection, mailSchema)
export default mailModel;