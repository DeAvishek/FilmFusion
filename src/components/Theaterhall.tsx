"use client"
import { Button } from "@/components/ui/button";
import React, { use, useState } from 'react';
import TheaterDataStore from "@/app/store/theaterStore";
import { useRouter } from "next/navigation";
import PriceStore from "@/app/store/ticPriceStore";
type SeatProp = {
    _id: string;
    seatnumber: string;
    status: string;
};

type TheaterProps = {
    seats: SeatProp[];
    theaterId: string
};

const Theaterhall = ({ seats, theaterId }: TheaterProps) => {
    //use ticket_PriceStore
    const use_ticket_price_store=PriceStore()
    const set_ticket_price=PriceStore((state)=>state.set_Price)
    const price=use_ticket_price_store.price
    
    const router=useRouter()
    const set_Theater_Data=TheaterDataStore((state)=>state.setTheaterData)
    //handle toggle
    const [PendingSeats, setPendingSeats] = useState<string[]>([])
    const handle_Seat_ToggleToyellow_Green = (seatnumber: string) => {
        if (PendingSeats.includes(seatnumber)) {

            setPendingSeats((prev) => prev.filter(item => item !== seatnumber))
        } else {

            setPendingSeats((prev) => [...prev, seatnumber])
        }
    }
    //totla price of tickets
    let total_seats_and_price=price*PendingSeats.length
    //state management of theater and pricetickts
    const handle_SetTheater_data=()=>{
        set_Theater_Data(PendingSeats,theaterId)
        set_ticket_price(total_seats_and_price)
        router.push(`/${theaterId}/payment_check`)

    }
    
    return (
        <div className="flex flex-col items-center justify-center mt-5 bg-gray-800 mb-4">
            {/* Single Screen Display */}
            <div className="relative w-full max-w-4xl h-32 mb-12">
                <div className="absolute inset-0 bg-white clip-trapezium shadow-2xl flex items-center justify-center">
                </div>
            </div>


            {/* Seat Layout */}
            <div className="seats-trapezium">
                {seats.map(({ _id, seatnumber, status }, index) => {
                    const rowIndex = Math.floor(index / 10); // Assuming 10 seats per row
                    return (
                        <Button
                            key={_id}
                            className={`w-14 h-14 flex items-center justify-center text-white font-bold seat-row
                            ${status === "booked" ? 'bg-red-700 cursor-not-allowed' : PendingSeats.includes(seatnumber) ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ '--row-index': rowIndex } as React.CSSProperties}
                            disabled={status === "booked"}
                            onClick={() => handle_Seat_ToggleToyellow_Green(seatnumber)}
                        >
                            {seatnumber}
                        </Button>
                    );
                })}
            </div>

            <Button className="bg-sky-400 mt-4" onClick={handle_SetTheater_data}>Proceed to pay {total_seats_and_price}</Button>
            <div>
                <p className="text-red-500">{PendingSeats.sort().join(',')}</p>
            </div>
        </div>
    );
};

export default Theaterhall;
