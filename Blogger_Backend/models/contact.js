import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: Number,
        required: true,
    }, 
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

export const ContactUs = mongoose.model("ContactUs", contactSchema)