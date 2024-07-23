import { Router } from 'express';
import { prismaClient } from '../db';

export const movieSchedule = Router();

movieSchedule.post('/', async(req, res)=>{
    const { movie_id, theater_id, slot } = req.body;
    const show_time = typeof req.body.show_time !== undefined ? new Date(req.body.show_time) : req.body.show_time;

    try {
        const response = await prismaClient.movieSchedule.create({
            data: {
                movie_id,
                theater_id,
                show_time,
                slot,
            }
        });
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

movieSchedule.get('/', async(req, res)=>{
    try {
        const response = await prismaClient.movie.findMany();
        return res.json(response);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

movieSchedule.get('/title/:title', async(req, res)=>{
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