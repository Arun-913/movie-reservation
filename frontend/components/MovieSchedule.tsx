import { ScheduledMovieType } from "@/types"
import { Mobile } from "./HeroIcons/Mobile"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { bookingState } from "@/store/atoms/bookingState"
import { useRecoilState } from "recoil"

export const MovieSchedule = ({ 
    movieSchedules,
}: { 
    movieSchedules: ScheduledMovieType[],
}) =>{
    const router = useRouter();
    const [bookingDetails, setBookingDetails] = useRecoilState(bookingState);

    const handleOnClick = async(schedule: ScheduledMovieType, slot: number, time: string, theaterName: string) =>{
        slot++;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie-schedule?movie_id=${schedule.movie_id}&theater_id=${schedule.theater_id}&slot=${slot}`)
        setBookingDetails(prevState => ({
            ...prevState,
            scheduledMovieId: response.data.id,
            theaterId: schedule.theater_id,
            theaterName,
            slot,
            time 
        }));

        const movieName = bookingDetails.movieName.replaceAll(' ', '_');
        router.push(`/buytickets/${movieName}/layout`)
    }

    return (
        <div className="bg-slate-100 p-2">
            <div className="bg-white m-2 p-4">
                {movieSchedules.map((value, index) =>{
                    return (
                        <ScheduleCard 
                            key={index} 
                            theaterName={value.theater.name + ": " + value.theater.location} 
                            onClick={(slot, time, theaterName) => handleOnClick(value, slot, time, theaterName)}
                        />
                    );
                })}
            </div>
        </div>
    )
}

const ScheduleCard = ({ 
    theaterName,
    onClick
}: { 
    theaterName: string,
    onClick: (slot: number, time: string, theaterName: string) => void
}) =>{
    const movieTime = ["07:00 AM", "11:00 AM", "03:00 PM", "07:00 PM"];

    return (
        <div className="text-sm">
            <span className="font-bold">{theaterName}</span>
            <div className="flex justify-start items-center">
                <Mobile />
                <div className="mr-20">M-ticket</div>

                {movieTime.map((time, slot)=>{ // slot(index)
                    return (
                        <div 
                            key={slot}
                            className="rounded-md m-4 p-2 border-2 border-slate-400 cursor-pointer"
                            onClick={() => onClick(slot, time, theaterName)}
                        >
                            {time}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

