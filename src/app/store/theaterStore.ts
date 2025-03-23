import {create} from "zustand"

type TheaterState={
    seats:string[],
    theaterId:string
}

type Actions={
    setTheaterData:(seats:string[],theaterId:string)=>void
    clearTheaterData:()=>void
}

const TheaterDataStore=create<TheaterState & Actions>((set)=>({
    seats:[],
    theaterId:'',
    setTheaterData:(seats, theaterId)=>set({seats,theaterId}),
    clearTheaterData:()=>set({seats:[],theaterId:''})
    
}))

export default TheaterDataStore