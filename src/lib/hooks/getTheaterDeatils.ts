import { gql, useQuery } from "@apollo/client";
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

export const GetTheater=(_id:string)=>{
     const { data } = useQuery(GET_THEATER, {
        variables: {
          search: {
            _id,
          },
        },
        skip: !_id, 
      });
      return {data}
}