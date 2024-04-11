import mongoose from 'mongoose'

const imageCollection = 'images'
const imageSchema = new mongoose.Schema({
    id: { type: String, required: true },
    filename: { type: String, required: true },
    uploaded: { type: Date, required: true },
    requireSignedURLs: { type: Boolean, required: true },
    variants: { type: [String], required: true },
    variants: { type: [String], required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});


const imageModel = mongoose.model(imageCollection, imageSchema)
export default imageModel