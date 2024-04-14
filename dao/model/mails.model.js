import mongoose from 'mongoose'

const mailCollection = 'mails'
const mailSchema = new mongoose.Schema({
    
   /* datetime: { type: Date, required: true, default: Date.now() },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },*/
});

const mailModel = mongoose.model(mailCollection, mailSchema)
export default mailModel;