import {create} from "zustand"

type TheaterState={
    seats:string[],
    theaterId:string
}

type Actions={
    setTheatreData:(seats:string[],theaterId:string)=>void
    clearTheatreData:()=>void
}

const TheaterDataStore=create<TheaterState & Actions>((set)=>({
    seats:[],
    theaterId:'',
    setTheatreData:(seats, theaterId)=>set({seats,theaterId}),
    clearTheatreData:()=>set({seats:[],theaterId:''})
    
}))

export default TheaterDataStore