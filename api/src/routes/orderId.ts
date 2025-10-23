import { Router } from 'express';
import Razorpay from 'razorpay';
import { authMiddleware, CustomRequest } from '../middleware';
import { z } from "zod";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET as string
});

export const orderRouter = Router();

orderRouter.post('/', authMiddleware, async(req: CustomRequest, res)=>{
    const { amount } = req.body;
    
    const parsedData = z.number().safeParse(amount);
    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const options = {
        amount: amount*100,  
        currency: 'INR',
        receipt: `receipt_order_${Number(req.id)}_${Date.now()}`,
        payment_capture: 1
    };

    try {
        const response = await razorpay.orders.create(options);
        return res.json(response);
    } catch (error) {
        console.log("error");
        return res.json(error);
    }
})