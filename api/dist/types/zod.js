"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatCancelDeleteZodSchema = exports.SeatConfirmationPostZodSchema = exports.SeatLockPostZodSchema = exports.SeatAvailabeGetZodSchema = exports.SeatPostZodSchema = exports.MovieSchedulePostZodSchema = exports.MoviePostZodSchema = exports.TheaterPostSchema = void 0;
const zod_1 = require("zod");
const literalSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]);
const jsonSchema = zod_1.z.lazy(() => zod_1.z.union([literalSchema, zod_1.z.array(jsonSchema), zod_1.z.record(jsonSchema)]));
exports.TheaterPostSchema = zod_1.z.object({
    name: zod_1.z.string(),
    location: zod_1.z.string()
});
exports.MoviePostZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    metadata: jsonSchema.optional(),
    genre: zod_1.z.string().optional(),
    duration: zod_1.z.number().gte(1).lte(180),
    release_date: zod_1.z.date().optional(),
    end_date: zod_1.z.date().optional(),
});
exports.MovieSchedulePostZodSchema = zod_1.z.object({
    movie_id: zod_1.z.string(),
    theater_id: zod_1.z.string(),
    show_time: zod_1.z.date(),
    slot: zod_1.z.number().gte(1).lte(4),
});
exports.SeatPostZodSchema = zod_1.z.object({
    theater_id: zod_1.z.string(),
    schedule_id: zod_1.z.string(),
    row_number: zod_1.z.number().gte(1).lte(10),
    seat_number: zod_1.z.number().gte(1).lte(20),
    date: zod_1.z.date(),
});
exports.SeatAvailabeGetZodSchema = zod_1.z.object({
    date: zod_1.z.date(),
    theater_id: zod_1.z.string(),
    schedule_id: zod_1.z.string(),
});
exports.SeatLockPostZodSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    theater_id: zod_1.z.string(),
    schedule_id: zod_1.z.string(),
    row_number: zod_1.z.number().gte(1).lte(10),
    seat_number: zod_1.z.number().gte(1).lte(20),
    date: zod_1.z.date(),
});
exports.SeatConfirmationPostZodSchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    schedule_id: zod_1.z.string(),
    locketSeat_id: zod_1.z.string().optional()
});
exports.SeatCancelDeleteZodSchema = zod_1.z.object({
    seat_id: zod_1.z.string(),
    ticket_id: zod_1.z.string()
});
