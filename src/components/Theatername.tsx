"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Theaterhall from "./Theaterhall";
import { getTheater } from "@/lib/hooks/getTheaterDeatils";
type TheaterID = {
  _id: string;
  name: string;
  location: string;
};



const Theatername = ({ _id, name, location }: TheaterID) => {

  const [check,setcheck] = useState<boolean>(false)
  const {data} = getTheater(_id)

  const handleClick = () => {
    setcheck((prev=>!prev))
  };



  return (
    <div className="flex flex-col items-center justify-center ">
    <Button className="flex items-center mt-5" onClick={handleClick}>
      {name} ({location})
    </Button>
    {check && (
            <Theaterhall  name={name} theaterId={_id} seats={data?.theater?.totalseats} />
      )}
    </div>
  );
};

export default Theatername;
