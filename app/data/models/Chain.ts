import mongoose, { Schema, model, models, Document, Types } from "mongoose";

// Define Chain Type
export type ChainDocument = Document & {
  name: string;
  headquarters: string;
  restaurants: Types.ObjectId[]; // Array of Restaurant IDs
};

// Define Mongoose Schema
const ChainSchema = new Schema<ChainDocument>(
  {
    name: { type: String, required: true },
    headquarters: { type: String, required: true },
    restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }], // One-to-Many relationship
  },
  { timestamps: true }
);

export const Chain = models.Chain || model<ChainDocument>("Chain", ChainSchema);
