import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../data/DB";
import Dish from "../../data/models/DishModel";

// Update Dish by ID
export async function PUT(req: NextRequest) {
  // try {
  await connectToDatabase();
  const updatedData = await req.json();

  //   // const updatedDish = await DishModel.findByIdAndUpdate(
  //   //   updatedData.iddCHeckMmsn,
  //   //   updatedData,
  //   //   {
  //   //     new: true,
  //   //   }
  //   // );

  //   if (!updatedDish) {
  //     return NextResponse.json({ message: "Dish not found" }, { status: 404 });
  //   }

  //   return NextResponse.json(updatedDish, { status: 200 });
  // } catch (error) {
  //   console.error("Error updating dish:", error);
  //   return NextResponse.json(
  //     { message: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}
