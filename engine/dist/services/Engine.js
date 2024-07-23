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
exports.Engine = void 0;
const db_1 = require("../db");
const RedisManager_1 = require("../RedisManager");
const type_1 = require("../types/type");
class Engine {
    constructor() {
    }
    LockSeat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ theater_id, schedule_id, row_number, seat_number, date }) {
            const isLockedSeat = yield db_1.prismaClient.lockedSeat.findFirst({
                where: {
                    theater_id,
                    schedule_id,
                    row_number,
                    seat_number,
                }
            });
            const isAlreadyBooked = yield db_1.prismaClient.seat.findFirst({
                where: {
                    theater_id,
                    schedule_id,
                    row_number,
                    seat_number,
                }
            });
            if (isLockedSeat || isAlreadyBooked) {
                return { error: "Seat is not Available" };
            }
            const now = new Date();
            const response = yield db_1.prismaClient.lockedSeat.create({
                data: {
                    theater_id,
                    schedule_id,
                    row_number,
                    seat_number,
                    deleteAt: new Date(now.getTime() + 5 * 60 * 1000)
                }
            });
            return { locketSeat_id: response.id };
        });
    }
    UnlockLockedSeatAndBookSeat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const response = yield db_1.prismaClient.lockedSeat.findFirst({
                where: {
                    id
                }
            });
            if (response == null) {
                return "";
            }
            const seat = yield db_1.prismaClient.seat.create({
                data: {
                    theater_id: response.theater_id,
                    schedule_id: response.schedule_id,
                    row_number: response.row_number,
                    seat_number: response.seat_number,
                    date: new Date()
                }
            });
            yield db_1.prismaClient.lockedSeat.delete({
                where: {
                    id
                }
            });
            return seat.id;
        });
    }
    CreateOrderId() {
        return {
            orderId: '123',
            receiptId: 'abc'
        };
    }
    process(_a) {
        return __awaiter(this, arguments, void 0, function* ({ message, clientId }) {
            console.log(message.type);
            switch (message.type) {
                case type_1.SEAT_LOCK:
                    try {
                        const { theater_id, schedule_id, row_number, seat_number, date } = message.data;
                        const res = yield this.LockSeat({ theater_id, schedule_id, row_number, seat_number, date });
                        if ("error" in res) {
                            throw new Error();
                        }
                        const { orderId, receiptId } = this.CreateOrderId();
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "SEAT_LOCKED",
                            payload: {
                                locketSeat_id: res.locketSeat_id,
                                orderId,
                                receiptId,
                            }
                        });
                    }
                    catch (error) {
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "LOCKED_CANCELLED",
                            payload: {
                                locketSeat_id: "",
                                orderId: "",
                                receiptId: "",
                            }
                        });
                    }
                    break;
                case type_1.BOOK_SEAT:
                    try {
                        const { user_id, schedule_id, locketSeat_id } = message.data;
                        const seat_id = yield this.UnlockLockedSeatAndBookSeat({ id: locketSeat_id });
                        if (seat_id == "") {
                            // throw error now 
                            // but eventually we again check whether seat is available or not and according to that we book seat without seatlock
                            throw new Error();
                        }
                        const ticket = yield db_1.prismaClient.ticket.create({
                            data: {
                                user_id,
                                schedule_id,
                                seat_id,
                                payment_status: "completed"
                            }
                        });
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "SEAT_BOOKED",
                            payload: {
                                ticket_id: ticket.id,
                                seat_id
                            }
                        });
                    }
                    catch (error) {
                        console.log(error);
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "BOOKING_CANCELLED",
                            payload: {
                                ticket_id: "",
                                seat_id: ""
                            }
                        });
                    }
                    break;
                case type_1.CANCEL_TICKET:
                    try {
                        const { seat_id, ticket_id } = message.data;
                        yield db_1.prismaClient.ticket.delete({
                            where: {
                                id: ticket_id
                            }
                        });
                        yield db_1.prismaClient.seat.delete({
                            where: {
                                id: seat_id
                            }
                        });
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "",
                            payload: {
                                message: "Ticket has been cancelled",
                                cancel_status: "success"
                            }
                        });
                    }
                    catch (error) {
                        RedisManager_1.RedisManager.getInstance().sendToApi(clientId, {
                            type: "",
                            payload: {
                                message: "Error while cancelling ticket",
                                cancel_status: "failed"
                            }
                        });
                    }
                    break;
            }
        });
    }
}
exports.Engine = Engine;
