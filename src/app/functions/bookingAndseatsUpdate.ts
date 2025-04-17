import axios from 'axios'

type theater_dataPrpop={
  seats:[string],
  theaterId:string,
  name:string
}
export const handle_making_booking = async (
  theaterData: theater_dataPrpop,
  price: number,
  paymentId: string,
  paymentStatus:string
) => {
  try {
    const data = {
      theatername: theaterData.name,
      seats: theaterData.seats,
      totalamount: price,
      paymentId:paymentId,
      paymentStatus:paymentStatus
    }

    const response = await axios.post('/api/booking/make_booking', data)

    if (response.status === 201) {
      console.log("✅ Booking added")
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Failed to add bookings", error.response?.data)
    } else {
      console.log("⚠️ Unknown error", error)
    }
  }
}

export const handle_Seat_status_post = async (
  theaterData: theater_dataPrpop,
  price: number,
  paymentId: string,
  paymentStatus:string
) => {
  try {
    const response = await axios.post(
      `/api/movie/${theaterData.theaterId}/seat_status_update`,
      theaterData.seats
    )

    if (response.status === 200) {
      await handle_making_booking(theaterData, price, paymentId,paymentStatus)

    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("❌ Seat status update failed:", error.response?.data.error)
    } else {
      console.log("⚠️ Unknown error updating seat status", error)
    }
  }
}
