import { Router } from 'express';
import { prismaClient } from '../db';
import { TheaterPostSchema } from '../types/zod';

export const theaterRouter = Router();

theaterRouter.post('/', async(req, res)=>{
    let name = req.body.name.toLowerCase(), location = req.body.location.toLowerCase();
    try {
        TheaterPostSchema.parse({name, location});
        const response = await prismaClient.theater.create({
            data: {
                name,
                location
            }
        });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

theaterRouter.get('/', async(req, res)=>{
    try {
        const response = await prismaClient.theater.findMany();
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
});

theaterRouter.get('/name/:name', async(req, res)=>{
    const name = req.params.name;
    try {
        const response = await prismaClient.theater.findFirst({
            where: {
                name
            }
        });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})
