import { atom } from "recoil";

export const bookingState = atom({
    key: 'bookingState',
    default: {
        date: new Date(),
        movieName: "",
        theaterName: "",
        scheduledMovieId: "",
        theaterId: "",
        slot: 0,
        time: "",
    },
})