"use strict";
// import { prismaClient } from "../db";
// import { RedisManager } from "../RedisManager";
// import { LockSeat } from "../types/type";
// export class Seat {
//     constructor() {
//     }
//     // isAvailable()
//     async LockSeat({ theater_id, schedule_id, row_number, seat_number, deleteAt } : {theater_id: string, schedule_id: string, row_number: number, seat_number: number, deleteAt: Date}): Promise<LockSeat>{
//         const isAvailabe = await prismaClient.lockedSeat.findFirst({
//             where: {
//                 theater_id,
//                 schedule_id,
//                 row_number,
//                 seat_number,
//                 deleteAt
//             }
//         })
//         if(isAvailabe){
//             return {error: "Seat is not Available"};
//         }
//         const now = new Date();
//         const response = await prismaClient.lockedSeat.create({
//             data: {
//                 theater_id,
//                 schedule_id,
//                 row_number,
//                 seat_number,
//                 deleteAt: new Date(now.getTime() + 5 * 60 * 1000)
//             }
//         })
//         return {id: response.id};
//     }
//     async UnlockSeat({ id }: {id: string}){
//         const response = await prismaClient.lockedSeat.findFirst({
//             where: {
//                 id
//             }
//         })
//         if(!response) return;
//         await prismaClient.seat.create({
//             data: {
//                 theater_id: response.id,
//                 schedule_id: response.schedule_id,
//                 row_number: response.row_number,
//                 seat_number: response.seat_number,
//                 date: new Date()
//             }
//         })
//         await prismaClient.lockedSeat.delete({
//             where: {
//                 id
//             }
//         });
//     }
//     CreateOrderId(){
//     }
//     async process({ theater_id, schedule_id, row_number, seat_number, date } : {theater_id: string, schedule_id: string, row_number: number, seat_number: number, date: Date}){
//         try {
//             const res = await this.LockSeat({id, schedule_id, row_number, seat_number, date});
//             if("error" in res){
//                 pRedisManager.getInstance.sendToApi()
//             }
//         } catch (err) {
//         }
//     }
// }
