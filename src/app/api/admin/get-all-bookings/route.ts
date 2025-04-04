import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import BookingModel from '@/app/Model/booking';

// GET handler for fetching all bookings
export async function GET() {
    try {
        await dbConnect(); // Ensure database connection
        const bookings = await BookingModel.find(); // Fetch all bookings
        return NextResponse.json({bookings:bookings}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching bookings', error }, { status: 500 });
    }
}
