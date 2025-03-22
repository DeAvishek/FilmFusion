"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { useEffect } from "react";

type SeatProp = {
    _id: string;
    seatnumber: string;
    status: string;
};


type TheaterProps = {
    seats: SeatProp[];
    theaterId:string
};


const Theaterhall = ({ seats,theaterId }: TheaterProps) => {
        //handle toggle
    const [PendingSeats,setPendingSeats] =useState<string[]>([])
    const handle_Seat_ToggleToyellow_Green=(seatnumber:string)=>{
        if(PendingSeats.includes(seatnumber)){
          
            setPendingSeats((prev)=>prev.filter(item=> item !== seatnumber))
        }else{
        
            setPendingSeats((prev)=>[...prev,seatnumber])
        }
    }
    return (
        <div className="flex flex-col items-center justify-center mt-5 bg-gray-800 mb-4">
            {/* Single Screen Display */}
            <div className="relative w-full max-w-4xl h-32 mb-12">
                <div className="absolute inset-0 bg-white clip-trapezium shadow-2xl flex items-center justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaV6xwbZTbQJAWiW2-PHa0vqaij6qnls7mYQ&s" alt="" />
                </div>
            </div>


            {/* Seat Layout */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                {seats.map(({ _id, seatnumber, status }) => (
                    <Button
                        key={_id}
                        className={`w-14 h-14 flex items-center justify-center text-white font-bold
                        ${status === "booked" ? 
                        'bg-red-500': 
                        PendingSeats.includes(seatnumber)?"bg-yellow-500":"bg-green-500"}`}
                        onClick={()=>handle_Seat_ToggleToyellow_Green(seatnumber)}
                    >
                        {seatnumber}
                    </Button>
                ))}
            </div>
            <Button className="bg-sky-400 mt-4">Book seats</Button>
            <div>
            <p className="text-red-500">{PendingSeats.join(',')}</p>
            </div>
        </div>
    );
};

export default Theaterhall;
