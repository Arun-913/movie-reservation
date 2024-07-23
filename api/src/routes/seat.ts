import { Router } from 'express';
import { prismaClient } from '../db';
import { RedisManager } from '../RedisManager';
import { SeatAvailabeGetZodSchema, SeatCancelDeleteZodSchema, SeatConfirmationPostZodSchema, SeatLockPostZodSchema, SeatPostZodSchema } from '../types/zod';
import { RedisSearchLanguages } from 'redis';
import { BOOK_SEAT, CANCEL_TICKET, SEAT_LOCK } from '../types';

export const seatRouter = Router();

// seatRouter.get('/', async(req, res)=>{
//     // console.log("get request");
//     // const response = await RedisManager.getInstance().sendAndAwait({
//     //     type: "SEAT",
//     // });

//     // res.json(response.payload);

//     const date = req.query.date as string;
//     const slot = parseInt(req.query.slot as string);
//     const theater_id = req.query.theater_id as string;
    
//     if(!date || isNaN(slot) || !theater_id){
//         return res.status(400).json({
//             message: "Theater Id, Date and Slot is required"
//         });
//     }

//     const formattedDate = new Date(date).toISOString();
//     const seats = await prismaClient.seat.findMany({
//         where: {
//             theater_id,
//         },
//     });

//     const filteredSeats = seats.filter(seat => {
//         const seatDate = new Date(seat.date);
//         const inputDate = new Date(date as string);

//         seatDate.setHours(0, 0, 0, 0);
//         inputDate.setHours(0, 0, 0, 0);

//         return seatDate.getTime() === inputDate.getTime();
//     });
//     return res.json(filteredSeats);
// })

seatRouter.get('/available', async(req, res)=>{
    const date = typeof req.query.date !== undefined ? new Date(req.query.date as string) : null;
    const theater_id = req.query.theater_id as string;
    const schedule_id = req.query.schedule_id as string;

    try {
        SeatAvailabeGetZodSchema.parse({date, theater_id, schedule_id});
        
        const seats = await prismaClient.seat.findMany({
            where: {
                theater_id,
                schedule_id
            },
        });
        
        if(!seats){
            throw new Error();
        }
    
        const filteredSeats = seats.filter(seat => {
            const seatDate = new Date(seat.date);
            const inputDate = date;

            seatDate.setHours(0, 0, 0, 0);
            inputDate?.setHours(0, 0, 0, 0);

            return seatDate.getTime() === inputDate?.getTime();
        });
        
        const notAvailableSeats = new Set();
        filteredSeats.map(seat =>{
            seat.row_number--;
            seat.seat_number--;
            notAvailableSeats.add((seat.row_number * 10) + seat.seat_number)
        })

        const availableSeats = [];
        for(let i=0; i<200; i++){
            if(!notAvailableSeats.has(i)){
                availableSeats.push(i);
            }
        }

        return res.json(availableSeats);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

seatRouter.post('/book', async(req, res)=>{
    const { user_id, theater_id, schedule_id, row_number, seat_number } = req.body;
    const date = typeof req.body.date !== undefined ? new Date(req.body.date) : req.body.date;

    try {
        SeatLockPostZodSchema.parse({ user_id, theater_id, schedule_id, row_number, seat_number, date });

        const response = await RedisManager.getInstance().sendAndAwait({
            type: SEAT_LOCK,
            data: {
                user_id,
                theater_id,
                schedule_id,
                row_number,
                seat_number,
                date
            }
        });

        return res.json(response.payload);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

seatRouter.post('/payment-confirmation', async(req, res)=>{
    const { user_id, schedule_id, locketSeat_id } = req.body;
    try {
        SeatConfirmationPostZodSchema.parse({ user_id, schedule_id, locketSeat_id });
        
        const response = await RedisManager.getInstance().sendAndAwait({
            type: BOOK_SEAT,
            data: {
                user_id,
                schedule_id, 
                locketSeat_id
            }
        });

        return res.json(response.payload);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

seatRouter.delete('/cancel', async(req, res)=>{
    const { seat_id, ticket_id } = req.body;
    try {
        SeatCancelDeleteZodSchema.parse({ seat_id, ticket_id });
        
        const response = await RedisManager.getInstance().sendAndAwait({
            type: CANCEL_TICKET,
            data: {
                seat_id, 
                ticket_id
            }
        });

        return res.json(response.payload);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})