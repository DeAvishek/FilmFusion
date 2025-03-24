"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import PriceStore from "@/app/store/ticPriceStore";
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
            variant="contained"
            size="large"
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
  return (
    <Box className="min-w-[275px] max-w-[350px] mx-auto mt-8 shadow-2xl transform transition-transform hover:scale-105">
      <Card variant="outlined" className="rounded-2xl overflow-hidden">
        <Cardcomponent time={time} screen={screen} price={price} _id={_id} />
      </Card>
    </Box>
  );
};

export default Showtimecard;
