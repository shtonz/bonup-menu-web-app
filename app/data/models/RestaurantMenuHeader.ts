import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantMenuHeaderSchema = new Schema({
  backgroundImageSrc: String,
  brandImageSrc: String,
});

const RestaurantMenuHeaderModel = mongoose.model(
  "RestaurantMenuHeader",
  RestaurantMenuHeaderSchema
);

export default RestaurantMenuHeaderModel;
