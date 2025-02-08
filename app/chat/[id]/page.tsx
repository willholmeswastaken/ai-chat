"use client";

import { ChatInput } from "@/components/chat-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import {
  Pencil,
  Copy,
  Share2,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useEffect } from "react";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const { messages } = useChat({
    id: chatId,
    experimental_throttle: 50,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>WAI</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">Hello world</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex flex-col">
                <div
                  className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                    message.role === "assistant"
                      ? "px-1"
                      : "bg-[#2A2A2A] text-white ml-auto"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="sr-only">Dislike</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput id={chatId} />
        </div>
      </div>
    </div>
  );
}
