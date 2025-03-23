"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Theaterhall from "./Theaterhall";

type TheaterID = {
  _id: string;
  name: string;
  location: string;
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

const Theatername = ({ _id, name, location }: TheaterID) => {

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
            <Theaterhall theaterId={_id} seats={data?.theater?.totalseats} />
      )}
    </div>
  );
};

export default Theatername;
