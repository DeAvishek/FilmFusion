"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {Button} from "@/components/ui/button"
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import PriceStore from "@/app/store/ticPriceStore";
import {useSession} from "next-auth/react"
import axios from "axios";
import Toastalert from "./Toastalert";
import { useState } from "react";
type ShowtimeProps = {
  time: string;
  screen: number;
  price: number;
  _id: string
};

const Cardcomponent = ({ time, screen, price, _id }: ShowtimeProps) => {
  
  
  const set_ticket_price=PriceStore((state)=>state.set_Price)
  const hnadle_on_click_of_BookSeats=()=>{
    //store management
    set_ticket_price(price)
    router.push(`/${_id}/get-showtime-theater`)
  }
  const router = useRouter()
  return (
    <React.Fragment>
      <CardContent className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl shadow-lg">
        <Typography gutterBottom variant="h4" className="text-white font-bold">
          🎟 Showtime: {time}
        </Typography>

        <Typography
          variant="button"
          className="text-gray-200 mb-2 text-xl"
        >
          🖥 Screen: {screen}
        </Typography>
        <br />
        <Typography
          variant="button"
          className="text-gray-200 mb-2 text-xl"
        >
          💲 Ticket Price: ₹{price}
        </Typography>
      </CardContent>
        <CardActions>
          <Button
            variant='default'
            className="bg-white text-blue-700 font-bold hover:bg-blue-400 transition-all"
            onClick={hnadle_on_click_of_BookSeats}
          >
            Book Seats
          </Button>
        </CardActions>
    </React.Fragment>
  );
};

const Showtimecard = ({ time, screen, price, _id }: ShowtimeProps) => {
  const [responseMessage, setresponseMessage] = useState<string>("")
  const {data:session} =useSession()
  const user=session?.user
  const handle_showtime_delete=async()=>{
    try {
      const response=await axios.delete(`/api/movie/${_id}/delete-showtime`)
      if(response.status===200){
        setresponseMessage(response.data.message)
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        setresponseMessage(error.response?.data.error || "server error occur during delete showtime")
      }else{
        setresponseMessage("server error occur during delete showtime")
      }
    }
    
  }
  return (
    <Box className="min-w-[275px] max-w-[350px] mx-auto mt-8 shadow-2xl transform transition-transform hover:scale-105">
      {responseMessage && <Toastalert alert_message={responseMessage}/>}
      <Card variant="outlined" className="rounded-2xl overflow-hidden">
        <Cardcomponent time={time} screen={screen} price={price} _id={_id} />
      </Card>
      {user?.role==="admin" && <Button  variant='destructive' onClick={handle_showtime_delete}>Delete show time</Button>}
    </Box>
  );
};

export default Showtimecard;
