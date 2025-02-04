import mongoose, { Schema, model, models, Document, Types } from "mongoose";

// Define Restaurant Type
export type RestaurantDocument = Document & {
  name: string;
  location: string;
  chain: Types.ObjectId; // Belongs to one Chain
  dishes: Types.ObjectId[]; // Array of Dish IDs
};

// Define Mongoose Schema
const RestaurantSchema = new Schema<RestaurantDocument>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    chain: { type: Schema.Types.ObjectId, ref: "Chain", required: true }, // One-to-One relationship
    dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }], // One-to-Many relationship
  },
  { timestamps: true }
);

export const Restaurant =
  models.Restaurant ||
  model<RestaurantDocument>("Restaurant", RestaurantSchema);
