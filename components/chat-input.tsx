"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ChatInput() {
  return (
    <div className="w-full max-w-3xl relative mb-4">
      <div className="relative bg-[#2A2A2A] rounded-2xl">
        <Textarea
          placeholder="Ask anything"
          className="bg-transparent border-0 min-h-[56px] max-h-[200px] py-4 pl-4 pr-24 text-white placeholder:text-gray-400 focus-visible:ring-0 resize-none overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              // Handle submit here
            }
          }}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows={1}
        />
        <div className="absolute right-4 top-3 flex gap-2">
          <Button
            size="icon"
            className="text-gray-800 bg-gray-400 hover:bg-white rounded-full h-8 w-8"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
