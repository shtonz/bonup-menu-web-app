import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * An option in a radio/multi-select group.
 */
interface Option {
  label: string;
  selected: boolean;
}

/**
 * A single item in the list.
 * - type: "RADIO" or "MULTI_SELECT"
 * - title: Title of the group
 * - options: array of toggleable options
 */
interface ListItem {
  type: "RADIO" | "MULTI_SELECT";
  title: string;
  options: Option[];
}

/**
 * The overall List document in MongoDB.
 * - items: array of ListItems (radio or multi-select)
 */
export interface ListDocument extends Document {
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
}

const OptionSchema = new Schema<Option>({
  label: { type: String, required: true },
  selected: { type: Boolean, default: false },
});

const ListItemSchema = new Schema<ListItem>({
  type: {
    type: String,
    enum: ["RADIO", "MULTI_SELECT"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  options: {
    type: [OptionSchema],
    default: [],
  },
});

const ModifiersSchema = new Schema<ListDocument>(
  {
    items: {
      type: [ListItemSchema],
      default: [],
    },
  },
  {
    timestamps: true, // automatically manage createdAt / updatedAt
  }
);

/**
 * Because Next.js may reload modules during development, check if the model
 * is already compiled in Mongoose. Otherwise, compile it.
 */
export const Modifiers: Model<ListDocument> =
  mongoose.models.List || mongoose.model<ListDocument>("List", ModifiersSchema);
