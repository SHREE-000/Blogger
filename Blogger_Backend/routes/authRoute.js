import express from 'express';
const router = express.Router();
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { postRegister, postLogin } from '../controllers';
const validator = createValidator({});

const registerSchema = Joi.object({
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    gender: Joi.string().required(),
    location: Joi.string().required(),
    phoneNum: Joi.number().integer().positive().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.alternatives().try(
        Joi.string().min(5).max(50), Joi.number().integer().positive().min(5)
    ).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.alternatives().try(
        Joi.string().min(5).max(50), Joi.number().integer().positive().min(5)
    ).required()
})

router.post('/login',
validator.body(loginSchema), 
postLogin
)

router.post('/register', 
validator.body(registerSchema), 
postRegister
)

export default router;