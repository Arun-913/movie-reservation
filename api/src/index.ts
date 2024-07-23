import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { theaterRouter } from './routes/theater';
import { movieRouter } from './routes/movie';
import { seatRouter } from './routes/seat';
import { PrismaClient } from '@prisma/client';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/theater', theaterRouter);
app.use('/api/movie', movieRouter);
app.use('/api/seat', seatRouter);

app.get('/', (req, res)=>{
    return res.json({message: "healthy"});
});


app.get('/get', async(req, res)=>{
    const prismaClient = new PrismaClient();
    const response = await prismaClient.seat.findMany();
    return res.json(response);
})

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
});