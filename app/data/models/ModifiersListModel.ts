import mongoose, { Schema, Model } from "mongoose";

/**
 * An option in a radio/multi-select group.
 */
export interface Option {
  id: string;
  label: string;
  selected: boolean;
}

interface IITEM_TYPES {
  RADIO: string;
  MULTI_SELECT: string;
}

export const ITEM_TYPES: IITEM_TYPES = {
  RADIO: "RADIO",
  MULTI_SELECT: "MULTI_SELECT",
};

/**
 * A single item in the list.
 * - type: "RADIO" or "MULTI_SELECT"
 * - title: Title of the group
 * - options: array of toggleable options
 */
export interface ModifiersListItem {
  type: string;
  title: string;
  options: Option[];
}

/**
 * The overall List document in MongoDB.
 * - items: array of ListItems (radio or multi-select)
 */
export interface ModifiersList {
  items: ModifiersListItem[];
}

const OptionSchema = new Schema<Option>({
  label: { type: String, required: true },
  selected: { type: Boolean, default: false },
});

export const ListItemSchema = new Schema<ModifiersListItem>({
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

const ModifiersSchema = new Schema<ModifiersList>(
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
const ModifiersListModel: Model<ModifiersList> = mongoose.model<ModifiersList>(
  "List",
  ModifiersSchema
);

export default ModifiersListModel;
