import { string, z } from "zod";
import { theaterRouter } from "../routes/theater";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const TheaterPostSchema = z.object({
    name: z.string(),
    location: z.string()
});

export const MoviePostZodSchema = z.object({
    title: z.string(),
    metadata: jsonSchema.optional(),
    genre: z.string().optional(),
    duration: z.number().gte(1).lte(180),
    release_date: z.date().optional(),
    end_date: z.date().optional(),
})

export const MovieSchedulePostZodSchema = z.object({
    movie_id: z.string(),
    theater_id: z.string(),
    show_time: z.date(),
    slot: z.number().gte(1).lte(4),
});

export const SeatPostZodSchema = z.object({
    theater_id: z.string(),
    schedule_id: z.string(),
    row_number: z.number().gte(1).lte(10),
    seat_number: z.number().gte(1).lte(20),
    date: z.date(),
})

export const SeatAvailabeGetZodSchema = z.object({
    date: z.date(),
    theater_id: z.string(),
    schedule_id: z.string(),
});

export const SeatLockPostZodSchema = z.object({
    user_id: z.number(),
    theater_id: z.string(),
    schedule_id: z.string(),
    row_number: z.number().gte(1).lte(10),
    seat_number: z.number().gte(1).lte(20),
    date: z.date(),
});

export const SeatConfirmationPostZodSchema = z.object({
    user_id: z.number(),
    schedule_id: z.string(),
    locketSeat_id: z.string().optional()
})

export const SeatCancelDeleteZodSchema = z.object({
    seat_id: z.string(), 
    ticket_id: z.string()
})