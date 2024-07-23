import { Router } from 'express';
import { prismaClient } from '../db';
import { MoviePostZodSchema } from '../types/zod';
import { GeoReplyWith } from 'redis';

export const movieRouter = Router();

movieRouter.post('/', async(req, res)=>{
    let { title, metadata, genre, duration, release_date, end_date } = req.body;
    title = title.toLowerCase(), genre = genre.toLowerCase();
    const r = typeof release_date !== undefined ? new Date(release_date) : release_date;
    const e = typeof end_date !== undefined ? new Date(end_date) : end_date;

    try {
        MoviePostZodSchema.parse({title, metadata, genre, duration, r, e});
        const response = await prismaClient.movie.create({
            data: {
                title,
                metadata,
                genre,
                duration,
                release_date,
                end_date 
            }
        });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

movieRouter.get('/', async(req, res)=>{
    try {
        const response = await prismaClient.movie.findMany();
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

movieRouter.get('/title/:title', async(req, res)=>{
    const title = req.params.title;
    try {
        const response = await prismaClient.movie.findFirst({
            where: {
                title
            }
        });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})