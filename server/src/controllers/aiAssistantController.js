import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const aiAssistantHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid request: 'message' is required." });
    }

    // System prompt for a coffee and recipes expert, with explicit plain text formatting and example
    const systemPrompt = `You are a coffee expert and recipes expert. You can help users with questions about:
    - How to make different types of coffee (hot, cold, espresso, etc.)
    - Coffee recipes and preparation methods
    - Ingredients for various coffee drinks
    - Tips for brewing, serving, and enjoying coffee
    - Coffee beans, roasting, and grinding
    - Pairing coffee with food
    - Coffee culture and history

    Always return your answers as well-formatted plain text. Be concise and to the point—avoid lengthy explanations. Use clear section titles in ALL CAPS (e.g., INGREDIENTS, STEPS, TIPS). For lists, use bullet points (with "-") and for instructions, use numbered steps ("1.", "2.", etc.). Do NOT use any HTML tags or attributes.

    For example, if asked for a recipe, answer like this:

    HOW TO MAKE ICED COFFEE

    INGREDIENTS:
    - 1 cup strong brewed coffee
    - 1/2 cup milk
    - 1-2 tablespoons sugar
    - Ice cubes

    STEPS:
    1. Brew the coffee and let it cool.
    2. Fill a glass with ice cubes.
    3. Pour the coffee over the ice.
    4. Add milk and sugar, then stir well.

    TIPS:
    - Use cold brew for a smoother taste.
    - Adjust sweetness to your preference.

    Make sure your response is visually clear, easy to read as plain text, and not too lengthy.`;

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
