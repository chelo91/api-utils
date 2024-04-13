import mongoose from 'mongoose'

const logCollection = 'logs'
const logSchema = new mongoose.Schema({
    request: {
        url: { type: String, required: true },
        method: { type: String, required: true },
        locals: { type: [] }
    },
    response: {
        status: { type: Number, required: true },
        message: { type: String },
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