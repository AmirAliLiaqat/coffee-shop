"use client";

import { Card } from "@/components/ui/card";
import { AIChat } from "@/components/dashboard/ai-assistant/AIChat";

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto max-w-4xl h-[calc(100vh-8rem)] animate-fadeIn">
      <Card className="h-full flex flex-col animate-slideUp">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold animate-slideDown">AI Assistant</h1>
          <p className="text-muted-foreground animate-fadeIn delay-100">
            Ask me anything about the coffee shop management system
          </p>
        </div>
        <AIChat className="flex-1 animate-fadeIn delay-150" />
      </Card>
    </div>
  );
} 