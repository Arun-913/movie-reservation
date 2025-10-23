"use client";
import { MovieHeader } from "@/components/MovieHeader";
import { MovieSchedule } from "@/components/MovieSchedule";
import { bookingState } from "@/store/atoms/bookingState";
import { ScheduledMovieType } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function() {
    const parmas = useParams();
    const [movieSchedules, setMovieSchedules] = useState<ScheduledMovieType[] | null>(null);
    const [bookingDetails, setBookingDetails] = useRecoilState(bookingState);
    
    useEffect(() =>{
        async function fetchScheduledMovie(){
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie-schedule/movie-id/${parmas.movieId}`)
                setMovieSchedules(response.data?.scheduledMovies);
                setBookingDetails(prevState => ({
                    ...prevState,
                    movieName: response.data?.movieName
                }));
            } catch (error) {
                console.error("Error in Fetching Movie Details");
            }
        }

        fetchScheduledMovie();
    }, [])

    if(!movieSchedules){
        return <div>Loading...</div>
    }

    return (
        <div>
            <MovieHeader movieName={bookingDetails.movieName}/>
            <MovieSchedule movieSchedules={movieSchedules}/>
        </div>
    )
}