import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  firstname: { 
    type: String,
    required: true
  },
  lastname: { 
    type: String,
    required: true
  },
  gender: { 
    type: String,
    required: true
  },
  location: { 
    type: String,
    required: true
  },
  phoneNum: { 
    type: Number, 
    required: true,
    unique: true 
  },  
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
   
export const User = mongoose.model("User", userShema);

