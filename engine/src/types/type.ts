export const GET_SEAT = "GET_SEAT";
export const SEAT_LOCK = "SEAT_LOCK";
export const BOOK_SEAT = "BOOK_SEAT";
export const CANCEL_TICKET = "CANCEL_TICKET";
export const PAYMENT_CONFIRM = "PAYMENT_CONFIRM";

export type MessageToApi = {
    type: string,
    payload: {
        locketSeat_id: string,
        orderId: string,
        receiptId: string
    }
} | {
    type: string,
    payload: {
        ticket_id: string,
        seat_id: string
    }
} | {
    type: string,
    payload: {
        message: string,
        cancel_status: string
    }
}

// export type MessageFromApi = {
//     type: string,
//     data: {
//         user_id: number,
//         theater_id: string, 
//         schedule_id: string, 
//         row_number: number, 
//         seat_number: number,
//         date: Date,
//         locketSeat_id?: string,
//         seat_id?: string, 
//         ticket_id?: string
//     }
// }

export type MessageFromApi = {
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
        schedule_id: string
        locketSeat_id: string,
    }
} | {
    type: string,
    data: {
        seat_id: string,
        ticket_id: string
    }
}


export type LockSeatFunction = { 
    locketSeat_id: string
} | { 
    error: string
};