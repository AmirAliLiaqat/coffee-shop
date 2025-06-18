import mongoose from "mongoose";

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
      enum: ["Hot Drinks", "Cold Drinks", "Pastries", "Sandwiches", "Snacks"],
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
    dietaryInfo: [
      {
        type: String,
        enum: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free"],
      },
    ],
    allergens: [
      {
        type: String,
        enum: [
          "Milk",
          "Eggs",
          "Fish",
          "Shellfish",
          "Tree Nuts",
          "Peanuts",
          "Wheat",
          "Soy",
        ],
      },
    ],
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
