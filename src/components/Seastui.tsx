"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
type TheaterID = {
  _id: string;
  name: string;
  location: string;
};

type SeatProp = {
  _id: string;
  seatnumber: string;
  status: string;
};

// GraphQL Query
const GET_THEATER = gql`
  query Showtime($search: TheaterSearch) {
    theater(search: $search) {
      name
      totalseats {
        _id
        seatnumber
        status
      }
    }
  }
`;

const Seastui = ({ _id, name, location }: TheaterID) => {
  const [check,setcheck] = useState<boolean>(false)
  const { data, loading, error } = useQuery(GET_THEATER, {
    variables: {
      search: {
        _id,
      },
    },
    skip: !_id, // Prevent query if _id is missing
  });

  const handleClick = () => {
    setcheck((prev=>!prev))
  };

  return (
    <div className="flex flex-col items-center justify-center ">
    <Button className="flex items-center mt-5" onClick={handleClick}>
      {name} ({location})
    </Button>
    {check && (
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mt-7">
          {data?.theater?.totalseats?.map((item: SeatProp) => (
            <Button key={item._id} className={`${item.status==="available"?'bg-green-500':'bg-red-400'}      p-2`}>
              {item.seatnumber}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Seastui;
