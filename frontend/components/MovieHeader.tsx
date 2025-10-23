import { useState } from "react";
import { LeftArrow } from "./HeroIcons/LeftArrow";
import { RightArrow } from "./HeroIcons/RightArrow";
import { useRecoilState } from "recoil";
import { bookingState } from "@/store/atoms/bookingState";

interface BookDateProps {
    increaseDate: number;
    selected: boolean;
    onClick: () => void;
}

const weekDaysMap: { [key: number]: string } = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
};

export const monthNames: { [key: number]: string } = {
    0: 'JAN',
    1: 'FEB',
    2: 'MAR',
    3: 'APR',
    4: 'MAY',
    5: 'JUN',
    6: 'JUL',
    7: 'AUG',
    8: 'SEP',
    9: 'OCT',
    10: 'NOV',
    11: 'DEC'
};

export const MovieHeader = ({ movieName }: { movieName: string }) =>{
    const [bookingDetails, setBookingDetails] = useRecoilState(bookingState);
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

    return (
        <div className="mx-10 my-4">
            <div className="text-3xl my-2">
                {movieName}
            </div>
            <hr />
            <div className="my-2 flex justify-start items-center">
                <LeftArrow />
                {[0, 1, 2, 3].map(index => (
                    <BookDate 
                        key={index} 
                        increaseDate={index}
                        selected={selectedDateIndex === index} 
                        onClick={() => {
                            setSelectedDateIndex(index)
                            const date = new Date();
                            date.setDate(date.getDate() + index);
                            setBookingDetails(prevState => ({
                                ...prevState,
                                date,
                            }));
                        }}
                        />
                    ))}
                <RightArrow />
            </div>
        </div>
    )
}

const BookDate = ({ increaseDate, selected, onClick }: BookDateProps) => {
    const date = new Date();
    date.setDate(date.getDate() + increaseDate);
    

    return (
        <div 
            onClick={onClick}
            className={`mx-2 w-14 font-medium text-xs rounded-xl text-center p-2 cursor-pointer ${selected ? "bg-red-500 text-white" : "bg-white"}`}
        >
            <div>{weekDaysMap[date.getDay()]}</div>
            <div className="text-base">{date.getDate()}</div>
            <div>{monthNames[date.getMonth()]}</div>
        </div>
    );
}
