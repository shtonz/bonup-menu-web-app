import mongoose, { Model, models, Schema, Types } from "mongoose";
import { ListItemSchema, ModifiersListItem } from "./ModifiersListModel";

export interface IDish {
  _id: string;
  uiId: number;
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
  imageSrc: string;
  ModifiersListItems: ModifiersListItem[];
}

interface DishDocument extends IDish, Document {
  createdAt: Date;
  updatedAt: Date;
}

const DishSchema = new mongoose.Schema(
  {
    uiId: { type: Number, required: false },
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isPromoted: { type: Boolean, required: true },
    isPromotedSize: { type: Boolean, required: true },
    bannerText: { type: String, required: false },
    iconSrc: { type: String, required: false },
    score: { type: Number, required: true },
    cost: { type: Number, required: true },
    imageSrc: { type: String, required: true },
    ModifiersListItems: {
      type: [Schema.Types.ObjectId],
      ref: "ModifiersListItem",
      default: [],
    },
  },
  { timestamps: true }
);

/** Compile the model (with dev check to avoid re-compilation) */
const Dish: Model<DishDocument> =
  models.Dish || mongoose.model<DishDocument>("Dish", DishSchema);

export default Dish;
