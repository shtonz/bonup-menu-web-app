import { NextResponse } from "next/server";
import { connectToDatabase } from "../../data/DB";
import Dish from "../../data/models/Dish";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const dishes = await Dish.find({});

    return NextResponse.json(dishes);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
