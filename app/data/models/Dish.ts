import mongoose, { Schema, Types } from "mongoose";

//must be the same as DishSchema
export type DishObject = {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  price: number;
  isPromoted: boolean;
  isPromotedSize: boolean;
  bannerText: string;
  iconSrc: string;
  score: number;
  cost: number;
  modifiers: {};
  imageSrc: string;
};

const DishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isPromoted: { type: Boolean, required: true },
    isPromotedSize: { type: Boolean, required: true },
    bannerText: { type: String, required: true },
    iconSrc: { type: String, required: true },
    score: { type: Number, required: true },
    cost: { type: Number, required: true },
    modifiers: {},
    imageSrc: { type: String, required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    }, // One-to-One relationship
  },
  { timestamps: true }
);

const DishModel = mongoose.model("Dish", DishSchema);

export default DishModel;
