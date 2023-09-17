import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: { 
        type: String, 
        required: true
    },
    topic: { 
        type: String,
        required: true
    },
    desc: { 
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    media: { 
        type: String,
        required: true
    },
    userId: { 
        type: ObjectId,
        required: true
    },
    updatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

export const Blog = mongoose.model("Blog", blogSchema);