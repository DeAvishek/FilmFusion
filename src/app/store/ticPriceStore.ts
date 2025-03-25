import {create} from "zustand"
import {createJSONStorage,persist} from "zustand/middleware"
type priceState={
    price:number
}

type Action={
    set_Price:(price:number)=>void
    clear_Price:()=>void
}

const PriceStore=create<priceState & Action>()(persist((set)=>({
    price:0,
    set_Price:(price)=>set({price}),
    clear_Price:()=>set({price:0})
}),{
    name:"price_data_store",
    storage:createJSONStorage(()=>localStorage)
})
)
export default PriceStore