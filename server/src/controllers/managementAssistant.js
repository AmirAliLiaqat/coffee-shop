import { GoogleGenAI } from "@google/genai";
import Product from "../models/dashboard/Product.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Helper to extract product name from user message
const extractProductName = async (message) => {
  const products = await Product.find();
  const lowerMsg = message.toLowerCase();
  for (const product of products) {
    if (lowerMsg.includes(product.name.toLowerCase())) {
      return product;
    }
  }
  return null;
};

export const aiAssistantHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid request: 'message' is required." });
    }

    // Check if the user is asking about a recipe or ingredients
    const recipeKeywords = [
      "how to make",
      "recipe",
      "ingredients",
      "how do i make",
      "what's in",
      "what are the ingredients",
    ];
    const lowerMsg = message.toLowerCase();
    const isRecipeQuery = recipeKeywords.some((k) => lowerMsg.includes(k));

    if (isRecipeQuery) {
      const product = await extractProductName(message);
      if (product) {
        let responseText = `Here is information about ${product.name}:\n`;
        if (product.description) {
          responseText += `Description: ${product.description}\n`;
        }
        if (product.ingredients) {
          responseText += `Ingredients: ${product.ingredients}`;
        }
        return res.json({ response: responseText });
      }
    }

    // Fallback to Gemini
    const systemPrompt = `You are an AI assistant for a coffee shop management system. You can help users with questions about:
      - Menu management and item updates
      - Inventory tracking and stock management
      - Order processing and customer service
      - Staff scheduling and management
      - Customer feedback and satisfaction
      - Sales reports and analytics
      - Supplier management
      - Promotions and marketing
      - Reservations and table management
      
      Provide clear, concise, and helpful responses based on the user's questions.`;

    const prompt = `${systemPrompt}\n\nUser: ${message}`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "Failed to process your request";
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
};
