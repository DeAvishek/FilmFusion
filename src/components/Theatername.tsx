"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Theaterhall from "./Theaterhall";
import { GetTheater } from "@/lib/hooks/getTheaterDeatils";
type TheaterID = {
  _id: string;
  name: string;
  location: string;
};



const Theatername = ({ _id, name, location }: TheaterID) => {

  const [check, setcheck] = useState<boolean>(false)
  const { data } = GetTheater(_id)

  const handleClick = () => {
    setcheck((prev => !prev))
  };



  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Button
        className="flex items-center mt-5 w-full justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black"
        onClick={handleClick}
      >
        {name} ({location})
        <span>{check ? "▲" : "▼"}</span>
      </Button>

      {check && (
        <div className="w-full border p-4 bg-white shadow-md rounded-b-lg">
          <Theaterhall name={name} theaterId={_id} seats={data?.theater?.totalseats} />
        </div>
      )}
    </div>

  );
};

export default Theatername;
