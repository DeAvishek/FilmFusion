import {create} from "zustand"

type priceState={
    price:number
}

type Action={
    set_Price:(price:number)=>void
    clear_Price:()=>void
}

const PriceStore=create<priceState & Action>((set)=>({
    price:0,
    set_Price:(price)=>set({price}),
    clear_Price:()=>set({price:0})
}))
export default PriceStore