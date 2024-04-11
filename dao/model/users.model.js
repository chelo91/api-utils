import mongoose from 'mongoose'

const userCollection = 'users'
const userSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },
    actived: { type: Boolean, default: true },
});

const userModel = mongoose.model(userCollection, userSchema)
export default userModel;