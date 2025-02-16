import { NextResponse } from "next/server";
import { connectToDatabase } from "../../data/DB";
import Dish, { IDish } from "../../data/models/DishModel";

export async function POST(req: Request) {
  try {
    const dishProps: IDish = await req.json();

    //#region
    // // Validate input
    // if (
    //   !name ||
    //   !category ||
    //   !description ||
    //   !isPromoted ||
    //   !price ||
    //   !imageSrc
    // ) {
    //   return NextResponse.json(
    //     { message: "Missing properties" },
    //     { status: 400 }
    //   );
    // }
    //#endregion

    // Connect to MongoDB
    await connectToDatabase();
    console.log("Connected To Database");

    // Save the dish to the database
    const newDish = new Dish({
      name: dishProps.name,
      category: dishProps.category,
      subCategory: dishProps.subCategory,
      description: dishProps.description,
      price: dishProps.price,
      isPromoted: dishProps.isPromoted,
      isPromotedSize: dishProps.isPromotedSize,
      bannerText: dishProps.bannerText,
      iconSrc: dishProps.iconSrc,
      score: dishProps.score,
      cost: dishProps.cost,
      ModifiersListItems: dishProps.ModifiersListItems,
      imageSrc: dishProps.imageSrc,
    });

    console.log(newDish);
    await newDish.save();

    return NextResponse.json({ message: "Dish created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
