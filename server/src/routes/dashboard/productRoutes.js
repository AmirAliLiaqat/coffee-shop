import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleAvailability,
} from "../../controllers/dashboard/productController.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get a single product
router.get("/:id", getProduct);

// Create a new product
router.post("/", upload.single("image"), createProduct);

// Update a product
router.put("/:id", upload.single("image"), updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Toggle product availability
router.patch("/:id/toggle-availability", toggleAvailability);

export default router;
