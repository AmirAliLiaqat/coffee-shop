import Product from "../../models/dashboard/Product.js";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "../../utils/imageUpload.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    let imageUrl = null;

    // Handle image upload if file is present
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file);
    }

    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      imageUrl: imageUrl,
      available: req.body.available === "true" || req.body.available === true,
      preparationTime: req.body.preparationTime,
      calories: req.body.calories,
      ingredients: req.body.ingredients,
      dataAiHint: req.body.dataAiHint,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image upload if new file is present
    if (req.file) {
      // Delete old image if it exists
      if (product.imageUrl) {
        await deleteImageFromCloudinary(product.imageUrl);
      }
      // Upload new image
      const imageUrl = await uploadImageToCloudinary(req.file);
      product.imageUrl = imageUrl;
    }

    // Update other fields
    const updateFields = [
      "name",
      "category",
      "price",
      "description",
      "available",
      "preparationTime",
      "calories",
      "ingredients",
      "dataAiHint",
    ];

    updateFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "available") {
          product[field] =
            req.body[field] === "true" || req.body[field] === true;
        } else {
          product[field] = req.body[field];
        }
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary if it exists
    if (product.imageUrl) {
      await deleteImageFromCloudinary(product.imageUrl);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle product availability
export const toggleAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.available = !product.available;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
