import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../data/DB";
import Dish from "../../data/models/Dish";

// Update Dish by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const updatedData = await req.json();

    const updatedDish = await Dish.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedDish) {
      return NextResponse.json({ message: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDish, { status: 200 });
  } catch (error) {
    console.error("Error updating dish:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
