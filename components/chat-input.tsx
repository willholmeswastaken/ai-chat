"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChat } from "ai/react";
import { useRef } from "react";

interface Props {
  id: string;
}

export function ChatInput({ id }: Props) {
  const { input, handleInputChange, handleSubmit, isLoading } = useChat({
    id,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  const form = useRef<HTMLFormElement | null>(null);
  return (
    <div className="w-full max-w-3xl relative mb-4">
      <form
        ref={form}
        onSubmit={onSubmit}
        className="relative bg-[#2A2A2A] rounded-2xl"
      >
        <Textarea
          value={input}
          placeholder="Ask anything"
          className="bg-transparent border-0 min-h-[56px] max-h-[200px] py-4 pl-4 pr-24 text-white placeholder:text-gray-400 focus-visible:ring-0 resize-none overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              form.current?.requestSubmit();
            }
          }}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
            handleInputChange(e);
          }}
          rows={1}
        />
        <div className="absolute right-4 bottom-3 flex gap-2">
          <Button
            type="submit"
            size="icon"
            className="text-gray-800 bg-gray-400 hover:bg-white rounded-full h-8 w-8"
            disabled={isLoading || input.length === 0}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
