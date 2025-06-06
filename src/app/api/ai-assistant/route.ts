import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for a coffee shop management system. You can help users with questions about:
          - Menu management and item updates
          - Inventory tracking and stock management
          - Order processing and customer service
          - Staff scheduling and management
          - Customer feedback and satisfaction
          - Sales reports and analytics
          - Supplier management
          - Promotions and marketing
          - Reservations and table management
          
          Provide clear, concise, and helpful responses based on the user's questions.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      response: completion.choices[0].message?.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
