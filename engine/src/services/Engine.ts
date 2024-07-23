import { error } from "console";
import { prismaClient } from "../db";
import { RedisManager } from "../RedisManager";
import { BOOK_SEAT, CANCEL_TICKET, LockSeatFunction, MessageFromApi, PAYMENT_CONFIRM, SEAT_LOCK } from "../types/type";

export class Engine {

    constructor() {
        
    }

    async LockSeat({ theater_id, schedule_id, row_number, seat_number, date } : {theater_id: string, schedule_id: string, row_number: number, seat_number: number, date: Date}): Promise<LockSeatFunction>{
        const isLockedSeat = await prismaClient.lockedSeat.findFirst({
            where: {
                theater_id,
                schedule_id,
                row_number,
                seat_number,
            }
        })

        const isAlreadyBooked = await prismaClient.seat.findFirst({
            where: {
                theater_id,
                schedule_id,
                row_number,
                seat_number,
            }
        })

        if(isLockedSeat || isAlreadyBooked){
            return {error: "Seat is not Available"};
        }
        
        const now = new Date();
        const response = await prismaClient.lockedSeat.create({
            data: {
                theater_id,
                schedule_id,
                row_number,
                seat_number,
                deleteAt: new Date(now.getTime() + 5 * 60 * 1000)
            }
        })
        return {locketSeat_id: response.id};
    }

    async UnlockLockedSeatAndBookSeat({ id }: {id: string}): Promise<string>{
        const response = await prismaClient.lockedSeat.findFirst({
            where: {
                id
            }
        })

        if(response == null){
            return "";
        }
        
        const seat = await prismaClient.seat.create({
            data: {
                theater_id: response.theater_id,
                schedule_id: response.schedule_id,
                row_number: response.row_number,
                seat_number: response.seat_number,
                date: new Date()
            }
        })

        await prismaClient.lockedSeat.delete({
            where: {
                id
            }
        });
        return seat.id;
    }

    CreateOrderId(){
        return {
            orderId: '123',
            receiptId: 'abc'
        };
    }

    public async process({ message, clientId }: {message: MessageFromApi, clientId: string}){
        console.log(message.type);
        switch(message.type){
            case SEAT_LOCK:
                try {
                    const { theater_id, schedule_id, row_number, seat_number, date }: any = message.data;
                    const res = await this.LockSeat({theater_id, schedule_id, row_number, seat_number, date});
                    if("error" in res){
                        throw new Error();
                    }
    
                    const { orderId, receiptId } = this.CreateOrderId();
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "SEAT_LOCKED",
                        payload: {
                            locketSeat_id: res.locketSeat_id,
                            orderId,
                            receiptId,
                        }
                    });
                } catch (error) {
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "LOCKED_CANCELLED",
                        payload: {
                            locketSeat_id: "",
                            orderId: "",
                            receiptId: "",
                        }
                    });
                }
                break;
            case BOOK_SEAT:
                try {
                    const { user_id, schedule_id, locketSeat_id }: any = message.data;
                    
                    const seat_id: string = await this.UnlockLockedSeatAndBookSeat({id: locketSeat_id as string});
                    if(seat_id == ""){
                        // throw error now 
                        // but eventually we again check whether seat is available or not and according to that we book seat without seatlock
                        throw new Error();
                    }
                    
                    const ticket = await prismaClient.ticket.create({
                        data: {
                            user_id,
                            schedule_id, 
                            seat_id, 
                            payment_status: "completed"
                        }
                    })
                    
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "SEAT_BOOKED",
                        payload: {
                            ticket_id: ticket.id,
                            seat_id
                        }
                    });
                } catch (error) {
                    console.log(error);
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "BOOKING_CANCELLED",
                        payload: {
                            ticket_id: "",
                            seat_id: ""
                        }
                    });
                }
                break;
            case CANCEL_TICKET:
                try {
                    const { seat_id, ticket_id }: any = message.data;
                    await prismaClient.ticket.delete({
                        where: {
                            id: ticket_id
                        }
                    });

                    await prismaClient.seat.delete({
                        where: {
                            id: seat_id
                        }
                    });
                    
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "",
                        payload: {
                            message: "Ticket has been cancelled",
                            cancel_status: "success"
                        }
                    });
                } catch (error) {
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "",
                        payload: {
                            message: "Error while cancelling ticket",
                            cancel_status: "failed"
                        }
                    });
                }
                break;
        }

    }
}