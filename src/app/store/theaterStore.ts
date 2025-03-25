import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"
type TheaterState={
    seats:string[],
    theaterId:string
    name:string
    
}

type Actions={
    setTheaterData:(seats:string[],theaterId:string,theatername:string)=>void
    clearTheaterData:()=>void
}

const TheaterDataStore=create<TheaterState & Actions>()(persist((set)=>({
    seats:[],
    theaterId:'',
    name:'',
    setTheaterData:(seats, theaterId,name)=>set({seats,theaterId,name}),
    clearTheaterData:()=>set({seats:[],theaterId:'',name:''})
    
}),{
   name:"theater_data_store",
   storage:createJSONStorage(()=>localStorage)
})
)

export default TheaterDataStore