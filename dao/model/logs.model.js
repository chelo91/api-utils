import mongoose from 'mongoose'

const logCollection = 'logs'
const logSchema = new mongoose.Schema({
    response: {
        url: { type: String, required: true },
        status: { type: Number, required: true },
        method: { type: String, required: true },
        message: { type: String, required: true },
    },
    request: {
        url: { type: String, required: true },
        method: { type: String, required: true },
        body: { type: String, required: true }
    },
    date: { type: Date, default: Date.now() },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const logModel = mongoose.model(logCollection, logSchema)
export default logModel