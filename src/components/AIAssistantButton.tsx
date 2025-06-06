"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { AIChat } from "./chat/AIChat";

export function AIAssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>

      <SharedDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="AI Assistant"
        description="Ask me anything about the coffee shop management system"
        size="lg"
        showCloseButton={true}
        onClose={() => setIsOpen(false)}
        className="animate-scaleIn"
      >
        <AIChat className="flex-1" />
      </SharedDialog>
    </>
  );
} 