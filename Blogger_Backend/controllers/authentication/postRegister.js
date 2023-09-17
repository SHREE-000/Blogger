import { User } from '../../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const postRegister = async(req, res) => {
    try {
        const {
            firstname,
            lastname,
            gender,
            location,
            phoneNum,
            email,
            password
        } = req.body;

        // Check user exists or not
        const isUserExists = await User.exists({ email: email.toLowerCase() })
        if(isUserExists) return res.status(409).send('Email already in use');
        
        // Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            createdAt: new Date(),
            firstname,
            lastname,
            gender,
            location,
            phoneNum,
            email: email.toLowerCase(),
            password: encryptedPassword,
        })
        
        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
            },
            process.env.JWT_SECRET_KEY
            )
        const username = user.firstname + " " + user.lastname;    
        
        return res.status(201).json({
            userDetails: {
                token,
                email: user.email,
                id: user._id,   
                username
            }
        })    
    } catch (error) {
        res.status(500).send("Failed, please try later")
    }
}