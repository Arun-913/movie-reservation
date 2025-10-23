import { NextFunction, request, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTSecretKey } from "./config";

export interface CustomRequest extends Request{
    id?: string;
}

export function authMiddleware (req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] as unknown as string;
    
    try {
        const payload = jwt.verify(token, JWTSecretKey) as JwtPayload;
        
        if (payload && payload.id) {
            req.id = payload.id as string;
        }

        next();
    } catch(e) {
        return res.status(403).json({
            message: "You are not logged in"
        })
    }
}