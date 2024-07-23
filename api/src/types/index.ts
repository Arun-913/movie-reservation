export const GET_SEAT = "GET_SEAT";
export const SEAT_LOCK = "SEAT_LOCK";
export const BOOK_SEAT = "BOOK_SEAT";
export const CANCEL_TICKET = "CANCEL_TICKET";
export const PAYMENT_CONFIRM = "PAYMENT_CONFIRM";


export type MessageToEngine = {
    type: string,
    data: {
        user_id: number,
        theater_id: string, 
        schedule_id: string, 
        row_number: number, 
        seat_number: number,
        date: Date,
    }
} | {
    type: string,
    data: {
        user_id: number,
        locketSeat_id: string,
    }
} | {
    type: string,
    data: {
        seat_id: string,
        ticket_id: string
    }
}

export type MessageFromEngine = {
    type: string,
    payload: {
        id: string,
        receipt: string
    }
} | {
    type: string,
    payload: {
        message: string,
        booking_status: string
    }
}