"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleArrowUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-2xl overflow-y-auto h-[calc(100vh-120px)] p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`max-w-[80%] rounded-3xl ${
                message.role === "user" ? "bg-blue-500" : "bg-white"
              }`}
            >
              <CardContent className="overflow-y-auto p-3">
                <p
                  className={`${
                    message.role === "user" ? "text-white" : "text-gray-700"
                  }`}
                >
                  {message.content}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-2xl p-2">
        <Card className="w-full max-w-2xl rounded-3xl">
          <CardContent className="overflow-y-auto p-1 focus-within:outline-none focus-within:ring-0">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow border-none focus:ring-0 focus:outline-none rounded-none shadow-none bg-transparent ring-0 ring-offset-0"
            />
          </CardContent>
          <CardFooter className="flex w-full justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full p-3"
            >
              <CircleArrowUp />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
