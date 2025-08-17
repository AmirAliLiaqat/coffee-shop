import mongoose from "mongoose";
import { PRODUCT_CATEGORIES_ARRAY } from "../../utils/enums.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: PRODUCT_CATEGORIES_ARRAY,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
      min: 1,
    },
    calories: {
      type: Number,
      min: 0,
    },
    ingredients: {
      type: String,
      trim: true,
    },
    dataAiHint: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
