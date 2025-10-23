import { Router } from "express";
import { prismaClient } from "../db";
import { createHmac } from 'crypto';
import { SigninSchema, SignupSchema } from "../types/zod";
import { JWTSecretKey, secretKey } from "../config";
import jwt from 'jsonwebtoken';

export const userRouter = Router();

const hashPassword = (password: string) =>{
    return createHmac('sha256', secretKey).update(password).digest().toString('hex');
}

userRouter.post('/signup', async(req, res)=>{
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });

    if(userExists){
        return res.status(403).json({
            message: "User already exists"
        })
    }

    const hashedPassword = hashPassword(parsedData.data.password);
    await prismaClient.user.create({
        data: {
            username: parsedData.data.username,
            email: parsedData.data.email,
            password: hashedPassword
        }
    });

    return res.json({
        message: "Register successfully created, please signin"
    });
});

userRouter.post('/signin', async(req, res)=>{
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });

    if(!userExists){
        return res.status(403).json({
            message: "User doesn't exists"
        })
    }

    if(hashPassword(parsedData.data.password) !== userExists.password){
        return res.status(411).json({
            message: "Credentials are incorrect"
        })
    }

    const token = jwt.sign({
        id: userExists.id
    }, JWTSecretKey);

    res.json({
        token: token,
    });
});