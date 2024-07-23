"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const RedisManager_1 = require("../RedisManager");
const zod_1 = require("../types/zod");
const types_1 = require("../types");
exports.seatRouter = (0, express_1.Router)();
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
exports.seatRouter.get('/available', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = typeof req.query.date !== undefined ? new Date(req.query.date) : null;
    const theater_id = req.query.theater_id;
    const schedule_id = req.query.schedule_id;
    try {
        zod_1.SeatAvailabeGetZodSchema.parse({ date, theater_id, schedule_id });
        const seats = yield db_1.prismaClient.seat.findMany({
            where: {
                theater_id,
                schedule_id
            },
        });
        if (!seats) {
            throw new Error();
        }
        const filteredSeats = seats.filter(seat => {
            const seatDate = new Date(seat.date);
            const inputDate = date;
            seatDate.setHours(0, 0, 0, 0);
            inputDate === null || inputDate === void 0 ? void 0 : inputDate.setHours(0, 0, 0, 0);
            return seatDate.getTime() === (inputDate === null || inputDate === void 0 ? void 0 : inputDate.getTime());
        });
        const notAvailableSeats = new Set();
        filteredSeats.map(seat => {
            seat.row_number--;
            seat.seat_number--;
            notAvailableSeats.add((seat.row_number * 10) + seat.seat_number);
        });
        const availableSeats = [];
        for (let i = 0; i < 200; i++) {
            if (!notAvailableSeats.has(i)) {
                availableSeats.push(i);
            }
        }
        return res.json(availableSeats);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.seatRouter.post('/book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, theater_id, schedule_id, row_number, seat_number } = req.body;
    const date = typeof req.body.date !== undefined ? new Date(req.body.date) : req.body.date;
    try {
        zod_1.SeatLockPostZodSchema.parse({ user_id, theater_id, schedule_id, row_number, seat_number, date });
        const response = yield RedisManager_1.RedisManager.getInstance().sendAndAwait({
            type: types_1.SEAT_LOCK,
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
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}));
exports.seatRouter.post('/payment-confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, schedule_id, locketSeat_id } = req.body;
    try {
        zod_1.SeatConfirmationPostZodSchema.parse({ user_id, schedule_id, locketSeat_id });
        const response = yield RedisManager_1.RedisManager.getInstance().sendAndAwait({
            type: types_1.BOOK_SEAT,
            data: {
                user_id,
                schedule_id,
                locketSeat_id
            }
        });
        return res.json(response.payload);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
exports.seatRouter.delete('/cancel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seat_id, ticket_id } = req.body;
    try {
        zod_1.SeatCancelDeleteZodSchema.parse({ seat_id, ticket_id });
        const response = yield RedisManager_1.RedisManager.getInstance().sendAndAwait({
            type: types_1.CANCEL_TICKET,
            data: {
                seat_id,
                ticket_id
            }
        });
        return res.json(response.payload);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}));
