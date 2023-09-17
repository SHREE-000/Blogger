import { User } from '../../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const postLogin = async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        
        // Check user exists or not
        const user = await User.findOne({ email: email.toLowerCase() })
        if(!user) return res.status(409).send('Email id is not registered yet')

        // Decrypt password
        const isPasswrdMatch = await bcrypt.compare(password, user.password);
        if(isPasswrdMatch) {

            const {
                _id,
                firstname,
                lastname,
                location,
                email,
                isAdmin,
            } = user;
            const username = firstname + " " + lastname;
            // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
            },
            process.env.JWT_SECRET_KEY
            )
            return res.status(200).json({
                userDetails: {
                    username,
                    isAdmin,
                    location,
                    token,
                    email,
                    id: _id,
                }
            })    
        } else {
            return res.status(401).send("Wrong password")
        }
        
    } catch (error) {
        console.log(error, 'error');
        res.status(500).send("Failed, please try later")
    }
}