"use client";

import { monthNames } from "@/components/MovieHeader";
import { Payment } from "@/components/Payment";
import { bookingState } from "@/store/atoms/bookingState";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function(){
    const url = "http://localhost:8000/api/seat/available?theater_id=e4605b24-6631-493b-90b3-c1ad61b1737f&schedule_id=004b8ca8-473c-43c3-aebb-9bc4f98375d9&date=2024-08-25T00:00:00.000Z";
    const [bookingDetails, setBookingDetails] = useRecoilState(bookingState);
    const Seats:   { [key: string]: number[] } = {
        'A' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'B' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'C' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'D' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'E' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'F' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'G' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'H' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'I' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'J' : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [booked, setBooked] = useState<Set<string>>(new Set());
    const rows = Object.keys(Seats) as Array<keyof typeof Seats>;
    const [amount, setAmount] = useState<number>(0);
    const slotToTime = {
        1: "07:00 AM",
        2: "11:00 AM",
        3: "03:00 PM",
        4: "07:00 PM"
    }
    const [showPayment, setShowPayment] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleSeatClick = (row: string, value: number) => {
        const newSelected = new Set(selected);
        const seat = row.toString() + value.toString();

        if(booked.has(seat)) return;

        if (newSelected.has(seat)) {
            newSelected.delete(seat);
            if(row >= 'A' && row <= 'E'){
                setAmount(amount - 290);
            }
            else if(row >= 'F' && row <= 'H'){
                setAmount(amount - 250);
            }
            else setAmount(amount - 200);
        } else {
            newSelected.add(seat);
            if(row >= 'A' && row <= 'E'){
                setAmount(amount + 290);
            }
            else if(row >= 'F' && row <= 'H'){
                setAmount(amount + 250);
            }
            else setAmount(amount + 200);
        }
        setSelected(newSelected);
    };

    const handleOnSubmit = async()=>{
        try {
            let bookingSeat = "";
            selected.forEach((seat)=>{
                bookingSeat = seat;
            })
            const row_number = bookingSeat.charCodeAt(0) - 64;
            const seat_number = bookingSeat.charCodeAt(1) - 48;
            const bookResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seat/book`,
                {
                    theater_id: bookingDetails.theaterId,
                    schedule_id: bookingDetails.scheduledMovieId,
                    row_number,
                    seat_number,
                    date: new Date("2024-08-25").toISOString()
                },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NzcxNTQzfQ.O2IavTzNrWMO4nSvLbIbcFDX5NWFicsnKcg8xP0hiX4`
                    }
                }
            );
            console.log("booking res: ", bookResponse);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order`,
                {
                    amount
                },
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NzcxNTQzfQ.O2IavTzNrWMO4nSvLbIbcFDX5NWFicsnKcg8xP0hiX4`
                    }
                }
            );

            setOrderId(response.data.id);
            setShowPayment(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        async function fetchAvailableSeats(){
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seat/available?theater_id=${bookingDetails.theaterId}&schedule_id=${bookingDetails.scheduledMovieId}&date=2024-08-25T00:00:00.000Z`);
                
                const result: number[] = response.data;
                const available = new Set<number>();
                for(let i=0; i<result.length; i++){
                    available.add(result[i]);
                }

                const temp = new Set<string>();
                for(let i=1; i<=100; i++){
                    let seat = i;
                    if(available.has(seat)) continue;
                    const seatNumber = seat % 10 != 0 ? seat % 10 : 10;
                    seat = Math.floor(seat / 10);
                    seat += 65;
                    if(seatNumber == 10) seat--;
                    temp.add(String.fromCharCode(seat) + seatNumber.toString());
                }
                setBooked(temp);
            } catch (error) {
                console.error("Unable to fetch seats");
                console.error(error);
            }
            
        } 

        fetchAvailableSeats();
    }, [])

    return (
        <div>
            {showPayment && <Payment orderId={orderId} />}
            {!showPayment && 
                <div className="">
                    <div className="bg-white px-10 py-4 sticky top-0">
                        <div>{bookingDetails.movieName}</div>
                        <span className="font-bold text-xs">{bookingDetails.theaterName} | {`${monthNames[bookingDetails.date.getMonth()]}, ${bookingDetails.time}`}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        {rows.map((row) => (
                            <div>
                                {row === 'A' && 
                                    <div className="font-semibold">
                                        Rs 290 PLATINUM
                                        <hr />
                                    </div>
                                }
                                {row === 'F' && 
                                    <div className="font-semibold">
                                        Rs 250 GOLD
                                        <hr />
                                    </div>
                                }
                                {row === 'I' && 
                                    <div className="font-semibold">
                                        Rs 200 SILVER
                                        <hr />
                                    </div>
                                }

                                <div key={row} className="flex justify-center items-center">
                                    <span className="mr-20">{row}</span>
                                    {Seats[row].map((value) => (
                                        <div 
                                            key={value} 
                                            className={`${selected.has(row.toString() + value.toString()) == true ? "bg-red-600 text-white hover:cursor-pointer" : ""} ${booked.has(row.toString() + value.toString()) == true ? "bg-slate-400 text-white border-slate-400" : "hover:cursor-pointer"} m-2 border-[1px] border-red-500 px-2 rounded-sm`}
                                            onClick={() => handleSeatClick(row as string, value)}
                                        >
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        <img className="my-6" src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" alt="Screen Image" />
                    </div>
                    
                    <div className="flex justify-center sticky bottom-0 bg-white m-4">
                        <div className="mx-2">
                            <span className="m-2 border-[1px] border-red-500 px-2 text-xs rounded-sm"></span>
                            <span className="text-sm">Available</span>
                        </div>

                        <div className="mx-2">
                            <span className="m-2 border-[1px] border-red-500 bg-red-600 px-2 text-xs rounded-sm"></span>
                            <span className="text-sm">Selected</span>
                        </div>

                        <div className="mx-2">
                            <span className="m-2 border-[1px] border-slate-400 bg-slate-400 px-2 text-xs rounded-sm"></span>
                            <span className="text-sm">Sold</span>
                        </div>
                    </div>
                    
                    {amount != 0 &&
                        <div 
                            className="bg-white h-16 flex justify-center items-center sticky bottom-0 hover:cursor-pointer"
                            onClick={handleOnSubmit}
                        >
                            <div className="w-1/3 bg-red-400 text-white font-semibold text-lg text-center rounded-lg p-2">Pay Rs.{amount}</div>
                    </div>}
                </div>
            }
        </div>
    )
}
