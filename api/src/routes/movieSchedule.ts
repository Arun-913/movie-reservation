import { Router } from 'express';
import { prismaClient } from '../db';
import { GetScheduledIdZodSchema } from '../types/zod';

export const movieSchedule = Router();

// movieSchedule.post('/', async(req, res)=>{
//     const { movie_id, theater_id, slot } = req.body;
//     const show_time = typeof req.body.show_time !== undefined ? new Date(req.body.show_time) : req.body.show_time;

//     try {
//         const response = await prismaClient.movieSchedule.create({
//             data: {
//                 movie_id,
//                 theater_id,
//                 show_time,
//                 slot,
//             }
//         });
//         return res.json(response);
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json(err);
//     }
// })

// Get all movies by movie_id
movieSchedule.get('/movie-id/:movieId', async(req, res)=>{
    const movie_id = req.params.movieId;
    try {
        const scheduledMovies = await prismaClient.movieSchedule.findMany({
            where: {
                movie_id
            },
            distinct: ['theater_id'],
            include: {
                theater: true
            }
        });

        const movieName = await prismaClient.movie.findFirst({
            where: {
                id: movie_id
            },
            select: {
                title: true,
            }
        });

        return res.json({
            movieName: movieName?.title,
            scheduledMovies,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

// Get movie's scheduled id by Movie_Id, Theater_Id & Slot number
movieSchedule.get('/', async(req, res)=>{
    const { movie_id, theater_id, slot } = req.query;
    try {
        const slotNumber = slot ? parseInt(slot as string, 10) : undefined;
        GetScheduledIdZodSchema.parse({ movie_id, theater_id, slot: slotNumber});


        const sceduledId = await prismaClient.movieSchedule.findFirst({
            where: {
                movie_id: movie_id as string,
                theater_id: theater_id as string,
                slot: slotNumber
            },
            select: {
                id: true
            }
        });

        return res.json(sceduledId);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})